import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  description: String,
  location: {
    city: { type: String, required: true },
    state: String,
    country: { type: String, default: "India" },
    address: String,
    coordinates: { lat: Number, lng: Number },
  },
  images: [{ url: String, public_id: String }],
  amenities: [String],
  category: { type: String, enum: ["budget","standard","deluxe","luxury","resort","villa","boutique"], default: "standard" },
  starRating: { type: Number, min: 1, max: 5 },
  pricePerNight: { type: Number, required: true },
  originalPrice: Number,
  discountPercent: { type: Number, default: 0 },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  avgRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  policies: {
    checkIn: { type: String, default: "12:00 PM" },
    checkOut: { type: String, default: "11:00 AM" },
    cancellation: { type: String, default: "Free cancellation up to 24hrs before check-in" },
  },
  totalBookings: { type: Number, default: 0 },
}, { timestamps: true });

hotelSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
  }
  next();
});
hotelSchema.index({ "location.city": 1, pricePerNight: 1 });
hotelSchema.index({ name: "text", "location.city": "text" });
export const Hotel = mongoose.model("Hotel", hotelSchema);