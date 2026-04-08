import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  method: { type: String, enum: ["razorpay","upi","card","netbanking","wallet"], required: true },
  status: { type: String, enum: ["created","pending","captured","failed","refunded"], default: "created" },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  receipt: String,
  failureReason: String,
  refundId: String,
  refundAmount: Number,
  refundedAt: Date,
}, { timestamps: true });
export const Payment = mongoose.model("Payment", paymentSchema);