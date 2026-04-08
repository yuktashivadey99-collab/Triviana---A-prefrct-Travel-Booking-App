import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["single","double","twin","suite","deluxe","presidential"], required: true },
  description: String,
  images: [{ url: String }],
  pricePerNight: { type: Number, required: true },
  maxOccupancy: { adults: { type: Number, default: 2 }, children: { type: Number, default: 1 } },
  bedType: { type: String, enum: ["single","double","queen","king","twin"], default: "double" },
  amenities: [String],
  isAvailable: { type: Boolean, default: true },
  totalRooms: { type: Number, default: 1 },
  bookedDates: [{ checkIn: Date, checkOut: Date, bookingId: mongoose.Schema.Types.ObjectId }],
  view: { type: String, enum: ["sea","mountain","city","garden","pool","none"], default: "none" },
}, { timestamps: true });

roomSchema.methods.isAvailableForDates = function (checkIn, checkOut) {
  return !this.bookedDates.some((b) => checkIn < b.checkOut && checkOut > b.checkIn);
};
export const Room = mongoose.model("Room", roomSchema);