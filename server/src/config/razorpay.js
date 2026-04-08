import Razorpay from "razorpay";

let instance = null;

export const getRazorpay = () => {
  if (!instance) {
    instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "placeholder",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder",
    });
  }
  return instance;
};

export default getRazorpay;