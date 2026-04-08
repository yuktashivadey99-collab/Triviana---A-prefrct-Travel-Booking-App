import mongoose from "mongoose";
const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true, unique: true },
  airlineLogo: String,
  from: { city: String, iataCode: { type: String, uppercase: true }, airport: String },
  to: { city: String, iataCode: { type: String, uppercase: true }, airport: String },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  duration: String,
  stops: { type: Number, default: 0 },
  classes: {
    economy: { price: Number, seatsAvailable: Number, baggage: String, meal: Boolean, refundable: Boolean },
    business: { price: Number, seatsAvailable: Number, baggage: String, meal: Boolean, refundable: Boolean },
    first: { price: Number, seatsAvailable: Number, baggage: String, meal: Boolean, refundable: Boolean },
  },
  status: { type: String, enum: ["scheduled","boarding","departed","arrived","delayed","cancelled"], default: "scheduled" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const Flight = mongoose.model("Flight", flightSchema);