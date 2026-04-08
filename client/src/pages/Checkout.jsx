import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";
import toast from "react-hot-toast";
import { CreditCard, User, Phone, Mail, Shield } from "lucide-react";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });

  if (!state) { navigate("/"); return null; }
  const { bookingData, hotelName, hotelImage } = state;

  const tax = Math.round(bookingData.baseAmount * 0.18);
  const total = bookingData.baseAmount + tax;

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create booking
      const bookingRes = await api.post("/bookings", {
        ...bookingData,
        contactInfo: contact,
        finalAmount: total,
      });
      const booking = bookingRes.data.data;

      // For now, simulate payment success (replace with real Razorpay when keys are ready)
      if (import.meta.env.VITE_RAZORPAY_KEY && import.meta.env.VITE_RAZORPAY_KEY !== "placeholder") {
        const orderRes = await api.post("/payments/create-order", { bookingId: booking._id });
        const { orderId, amount, currency, key } = orderRes.data.data;

        const options = {
          key, amount, currency, name: "TravelApp",
          description: `Booking ${booking.bookingRef}`,
          image: "/logo.png",
          order_id: orderId,
          handler: async (response) => {
            await api.post("/payments/verify", { ...response, bookingId: booking._id });
            toast.success("Payment successful! 🎉");
            navigate(`/booking/${booking._id}`);
          },
          prefill: { name: contact.name, email: contact.email, contact: contact.phone },
          theme: { color: "#f97316" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Demo mode — skip payment
        toast.success("Booking confirmed! (Demo mode) 🎉");
        navigate(`/booking/${booking._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="section-title mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="card p-6">
              <h2 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-400" /> Contact Information
              </h2>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Full Name" value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="input-field pl-10" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" placeholder="Email Address" value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="input-field pl-10" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="tel" placeholder="Phone Number" value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="input-field pl-10" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card p-6">
              <h2 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-400" /> Payment Method
              </h2>
              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Razorpay</p>
                  <p className="text-slate-400 text-sm">UPI, Cards, Net Banking, Wallets</p>
                </div>
                <div className="ml-auto w-5 h-5 rounded-full border-2 border-primary-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-semibold text-white mb-4">Booking Summary</h3>
              {hotelImage && (
                <img src={hotelImage} alt={hotelName} className="w-full h-36 object-cover rounded-xl mb-4" />
              )}
              <h4 className="text-white font-medium mb-1">{hotelName}</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-slate-400">
                  <span>Check-in</span><span className="text-white">{bookingData.checkIn}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Check-out</span><span className="text-white">{bookingData.checkOut}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Nights</span><span className="text-white">{bookingData.nights}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Guests</span><span className="text-white">{bookingData.guests?.adults} Adults</span>
                </div>
              </div>

              <div className="border-t border-dark-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Base Amount</span><span className="text-white">₹{bookingData.baseAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST (18%)</span><span className="text-white">₹{tax?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-dark-700">
                  <span className="text-white">Total</span>
                  <span className="text-primary-400">₹{total?.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={handlePayment} disabled={loading}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                Pay ₹{total?.toLocaleString()}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-xs">
                <Shield className="w-3.5 h-3.5" /> Secure 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}