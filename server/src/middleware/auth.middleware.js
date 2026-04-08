import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized - No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) throw new ApiError(401, "Unauthorized");
  req.user = user;
  next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "admin") throw new ApiError(403, "Admins only");
  next();
});

export const isHotelOwner = asyncHandler(async (req, res, next) => {
  if (!["admin", "hotel_owner"].includes(req.user?.role)) throw new ApiError(403, "Hotel owners only");
  next();
});