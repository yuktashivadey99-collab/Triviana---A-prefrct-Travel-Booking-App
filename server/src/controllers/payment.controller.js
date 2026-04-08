import crypto from "crypto";
import { getRazorpay } from "../config/razorpay.js";  // ← changed
import { Payment } from "../models/Payment.model.js";
import { Booking } from "../models/Booking.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.body.bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");
  if (booking.user.toString() !== req.user._id.toString()) throw new ApiError(403, "Not authorized");

  const razorpay = getRazorpay();  // ← call it here, not at module level
  const order = await razorpay.orders.create({
    amount: Math.round(booking.finalAmount * 100),
    currency: "INR",
    receipt: `receipt_${booking.bookingRef}`,
  });

  const payment = await Payment.create({
    booking: booking._id,
    user: req.user._id,
    amount: booking.finalAmount,
    method: "razorpay",
    razorpayOrderId: order.id,
    receipt: order.receipt,
  });

  booking.payment = payment._id;
  await booking.save({ validateBeforeSave: false });

  res.json(new ApiResponse(200, {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    paymentId: payment._id,
    key: process.env.RAZORPAY_KEY_ID,
  }, "Order created"));
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;
  const expectedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  if (expectedSig !== razorpaySignature) throw new ApiError(400, "Payment verification failed");
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId },
    { razorpayPaymentId, razorpaySignature, status: "captured" },
    { new: true }
  );
  await Booking.findByIdAndUpdate(bookingId, { status: "confirmed", paymentStatus: "paid" });
  res.json(new ApiResponse(200, { payment }, "Payment verified"));
});