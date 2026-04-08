import { User } from "../models/User.model.js";
import { Hotel } from "../models/Hotel.model.js";
import { Booking } from "../models/Booking.model.js";
import { Payment } from "../models/Payment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalHotels, totalBookings, confirmedBookings, pendingBookings, cancelledBookings, revenueData, recentBookings, topHotels] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Hotel.countDocuments({ isActive: true }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: "confirmed" }),
    Booking.countDocuments({ status: "pending" }),
    Booking.countDocuments({ status: "cancelled" }),
    Payment.aggregate([{ $match: { status: "captured" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    Booking.find({ status: "confirmed" }).sort("-createdAt").limit(5).populate("user", "name email").populate("hotel", "name"),
    Hotel.find({ isActive: true }).sort("-totalBookings").limit(5).select("name totalBookings avgRating location"),
  ]);
  res.json(new ApiResponse(200, {
    stats: { totalUsers, totalHotels, totalBookings, confirmedBookings, pendingBookings, cancelledBookings, totalRevenue: revenueData[0]?.total || 0 },
    recentBookings, topHotels,
  }, "Dashboard stats"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role } = req.query;
  const query = role ? { role } : {};
  const [users, total] = await Promise.all([User.find(query).sort("-createdAt").skip((page - 1) * limit).limit(Number(limit)), User.countDocuments(query)]);
  res.json(new ApiResponse(200, { users, total }, "Users fetched"));
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save({ validateBeforeSave: false });
  res.json(new ApiResponse(200, user, `User ${user.isActive ? "activated" : "deactivated"}`));
});