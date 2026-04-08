import { Review } from "../models/Review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createReview = asyncHandler(async (req, res) => {
  const existing = await Review.findOne({ user: req.user._id, hotel: req.params.hotelId });
  if (existing) throw new ApiError(400, "Already reviewed this hotel");
  const review = await Review.create({ user: req.user._id, hotel: req.params.hotelId, ...req.body });
  await review.populate("user", "name avatar");
  res.status(201).json(new ApiResponse(201, review, "Review added"));
});

export const getHotelReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const [reviews, total] = await Promise.all([
    Review.find({ hotel: req.params.hotelId }).sort("-createdAt").skip((page - 1) * limit).limit(Number(limit)).populate("user", "name avatar"),
    Review.countDocuments({ hotel: req.params.hotelId }),
  ]);
  res.json(new ApiResponse(200, { reviews, total }, "Reviews fetched"));
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw new ApiError(404, "Review not found");
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") throw new ApiError(403, "Not authorized");
  await review.deleteOne();
  res.json(new ApiResponse(200, {}, "Review deleted"));
});