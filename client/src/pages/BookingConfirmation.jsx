import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Download, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import api from "../utils/api";

export default function BookingConfirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/bookings/${id}`).then((res) => { setBooking(res.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-dark-900 pt-20 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="card p-8 text-center">
          <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-slate-400 mb-6">Your adventure awaits. Have a wonderful trip!</p>

          {booking && (
            <div className="bg-dark-700 rounded-2xl p-6 mb-6 text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Booking Ref</span>
                <span className="text-primary-400 font-bold font-mono">{booking.bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Status</span>
                <span className="capitalize text-green-400 bg-green-500/15 px-2 py-0.5 rounded-lg text-sm">{booking.status}</span>
              </div>
              {booking.hotel && (
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Hotel</span>
                  <span className="text-white text-sm">{booking.hotel.name}</span>
                </div>
              )}
              {booking.checkIn && (
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Check-in</span>
                  <span className="text-white text-sm">{new Date(booking.checkIn).toLocaleDateString()}</span>
                </div>
              )}
              {booking.checkOut && (
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Check-out</span>
                  <span className="text-white text-sm">{new Date(booking.checkOut).toLocaleDateString()}</span>
                </div>
              )}
              <div className="border-t border-dark-600 pt-3 flex justify-between font-bold">
                <span className="text-white">Total Paid</span>
                <span className="text-primary-400">₹{booking.finalAmount?.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2">
              View My Bookings <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/" className="btn-outline flex items-center justify-center gap-2">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 