import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  phone: String,
  avatar: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin", "hotel_owner"], default: "user" },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
  refreshToken: { type: String, select: false },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpire: { type: Date, select: false },
  lastLogin: Date,
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password; delete obj.refreshToken; delete obj.resetPasswordToken;
  return obj;
};
export const User = mongoose.model("User", userSchema);