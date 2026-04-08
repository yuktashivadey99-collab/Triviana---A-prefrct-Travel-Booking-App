import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingType: { type: String, enum: ["hotel","flight","package"], required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  checkIn: Date, checkOut: Date, travelDate: Date,
  guests: { adults: { type: Number, default: 1 }, children: { type: Number, default: 0 } },
  passengers: [{ name: String, age: Number, gender: String, passport: String }],
  contactInfo: { name: String, email: String, phone: String },
  baseAmount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  finalAmount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  couponCode: String,
  status: { type: String, enum: ["pending","confirmed","cancelled","completed"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending","paid","refunded","failed"], default: "pending" },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  bookingRef: { type: String, unique: true },
  specialRequests: String,
  cancelledAt: Date,
  cancellationReason: String,
  refundAmount: Number,
  flightClass: { type: String, enum: ["economy","premium_economy","business","first"] },
}, { timestamps: true });

bookingSchema.pre("save", function (next) {
  if (!this.bookingRef) this.bookingRef = "TRV" + Date.now().toString(36).toUpperCase();
  if (this.baseAmount) {
    this.taxAmount = Math.round(this.baseAmount * 0.18);
    this.totalAmount = this.baseAmount + this.taxAmount;
    this.finalAmount = this.totalAmount - (this.discountAmount || 0);
  }
  next();
});
export const Booking = mongoose.model("Booking", bookingSchema);