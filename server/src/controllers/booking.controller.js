import { Booking } from "../models/Booking.model.js";
import { Room } from "../models/Room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail, bookingConfirmationEmail } from "../utils/sendEmail.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { bookingType, hotelId, roomId, flightId, packageId, checkIn, checkOut, travelDate, guests, passengers, contactInfo, baseAmount, couponCode, specialRequests, flightClass } = req.body;
  if (!baseAmount) throw new ApiError(400, "Base amount required");
  if (bookingType === "hotel" && roomId) {
    const room = await Room.findById(roomId);
    if (!room) throw new ApiError(404, "Room not found");
    if (!room.isAvailableForDates(new Date(checkIn), new Date(checkOut))) throw new ApiError(400, "Room not available for selected dates");
  }
  const booking = await Booking.create({
    user: req.user._id, bookingType, hotel: hotelId, room: roomId, flight: flightId, package: packageId,
    checkIn, checkOut, travelDate, guests, passengers, contactInfo,
    baseAmount, couponCode, specialRequests, flightClass, finalAmount: baseAmount,
  });
  if (bookingType === "hotel" && roomId) {
    await Room.findByIdAndUpdate(roomId, { $push: { bookedDates: { checkIn, checkOut, bookingId: booking._id } } });
  }
  try { await sendEmail(bookingConfirmationEmail(booking, req.user)); } catch (e) { console.error("Email failed:", e.message); }
  await booking.populate(["hotel", "flight", "package", "room"]);
  res.status(201).json(new ApiResponse(201, booking, "Booking created"));
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const query = { user: req.user._id };
  if (status) query.status = status;
  const [bookings, total] = await Promise.all([
    Booking.find(query).sort("-createdAt").skip((page - 1) * limit).limit(Number(limit))
      .populate("hotel", "name images location").populate("flight", "airline flightNumber from to departure").populate("package", "title images destination"),
    Booking.countDocuments(query),
  ]);
  res.json(new ApiResponse(200, { bookings, total, page: Number(page) }, "Bookings fetched"));
});

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("hotel room flight package user payment");
  if (!booking) throw new ApiError(404, "Booking not found");
  if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") throw new ApiError(403, "Not authorized");
  res.json(new ApiResponse(200, booking, "Booking fetched"));
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, "Booking not found");
  if (booking.user.toString() !== req.user._id.toString()) throw new ApiError(403, "Not authorized");
  if (["cancelled", "completed"].includes(booking.status)) throw new ApiError(400, `Cannot cancel ${booking.status} booking`);
  booking.status = "cancelled";
  booking.cancelledAt = new Date();
  booking.cancellationReason = req.body.reason || "Cancelled by user";
  if (booking.room) await Room.findByIdAndUpdate(booking.room, { $pull: { bookedDates: { bookingId: booking._id } } });
  await booking.save();
  res.json(new ApiResponse(200, booking, "Booking cancelled"));
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, bookingType } = req.query;
  const query = {};
  if (status) query.status = status;
  if (bookingType) query.bookingType = bookingType;
  const [bookings, total] = await Promise.all([
    Booking.find(query).sort("-createdAt").skip((page - 1) * limit).limit(Number(limit)).populate("user", "name email").populate("hotel", "name"),
    Booking.countDocuments(query),
  ]);
  res.json(new ApiResponse(200, { bookings, total }, "All bookings"));
});