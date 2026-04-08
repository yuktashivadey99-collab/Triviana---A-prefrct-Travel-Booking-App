import { Hotel } from "../models/Hotel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllHotels = asyncHandler(async (req, res) => {
  const { city, minPrice, maxPrice, rating, category, page = 1, limit = 12, sort = "-createdAt", search } = req.query;
  const query = { isActive: true };
  if (city) query["location.city"] = { $regex: city, $options: "i" };
  if (minPrice || maxPrice) { query.pricePerNight = {}; if (minPrice) query.pricePerNight.$gte = Number(minPrice); if (maxPrice) query.pricePerNight.$lte = Number(maxPrice); }
  if (rating) query.avgRating = { $gte: Number(rating) };
  if (category) query.category = category;
  if (search) query.$text = { $search: search };
  const skip = (Number(page) - 1) * Number(limit);
  const [hotels, total] = await Promise.all([
    Hotel.find(query).sort(sort).skip(skip).limit(Number(limit)).populate("rooms", "pricePerNight type isAvailable"),
    Hotel.countDocuments(query),
  ]);
  res.json(new ApiResponse(200, { hotels, total, page: Number(page), pages: Math.ceil(total / Number(limit)) }, "Hotels fetched"));
});

export const getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id).populate("rooms")
    .populate({ path: "reviews", populate: { path: "user", select: "name avatar" }, options: { limit: 10 } });
  if (!hotel) throw new ApiError(404, "Hotel not found");
  res.json(new ApiResponse(200, hotel, "Hotel fetched"));
});

export const getFeaturedHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ featured: true, isActive: true }).limit(8).sort("-avgRating");
  res.json(new ApiResponse(200, hotels, "Featured hotels"));
});

export const createHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.create({ ...req.body, owner: req.user._id });
  res.status(201).json(new ApiResponse(201, hotel, "Hotel created"));
});

export const updateHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!hotel) throw new ApiError(404, "Hotel not found");
  res.json(new ApiResponse(200, hotel, "Hotel updated"));
});

export const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!hotel) throw new ApiError(404, "Hotel not found");
  res.json(new ApiResponse(200, {}, "Hotel deleted"));
});