import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: { type: String, required: true },
  categories: { cleanliness: Number, service: Number, location: Number, value: Number },
  images: [{ url: String }],
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

reviewSchema.post("save", async function () {
  if (this.hotel) {
    const stats = await mongoose.model("Review").aggregate([
      { $match: { hotel: this.hotel } },
      { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    if (stats.length) await mongoose.model("Hotel").findByIdAndUpdate(this.hotel, { avgRating: Math.round(stats[0].avg * 10) / 10, totalReviews: stats[0].count });
  }
});
export const Review = mongoose.model("Review", reviewSchema);