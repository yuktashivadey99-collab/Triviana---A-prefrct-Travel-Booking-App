import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { Calendar, MapPin, CheckCircle, Clock, XCircle, Star, User, Phone, Mail } from "lucide-react";

const statusConfig = {
  confirmed: { color: "text-green-400 bg-green-500/15", icon: CheckCircle },
  pending: { color: "text-yellow-400 bg-yellow-500/15", icon: Clock },
  cancelled: { color: "text-red-400 bg-red-500/15", icon: XCircle },
  completed: { color: "text-blue-400 bg-blue-500/15", icon: CheckCircle },
};

export default function Dashboard() {
  const { user } = useSelector((s) => s.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    api.get("/bookings/my").then((res) => { setBookings(res.data.data.bookings || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = activeTab === "all" ? bookings : bookings.filter((b) => b.status === activeTab);

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-orange-400 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Welcome back, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-slate-400">{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Trips", value: bookings.length, color: "text-primary-400" },
            { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, color: "text-green-400" },
            { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, color: "text-yellow-400" },
            { label: "Completed", value: bookings.filter((b) => b.status === "completed").length, color: "text-blue-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="card p-4 text-center">
              <div className={`font-display text-3xl font-bold ${color}`}>{value}</div>
              <div className="text-slate-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "confirmed", "pending", "cancelled", "completed"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${activeTab === tab ? "bg-primary-500 text-white" : "bg-dark-700 text-slate-400 hover:text-white"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings */}
        {loading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="card h-32 shimmer" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">✈️</div>
            <h3 className="text-white font-semibold text-xl mb-2">No bookings yet</h3>
            <p className="text-slate-400 mb-6">Start planning your dream trip today!</p>
            <Link to="/hotels" className="btn-primary inline-flex">Explore Hotels</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => {
              const { color, icon: StatusIcon } = statusConfig[booking.status] || statusConfig.pending;
              const image = booking.hotel?.images?.[0]?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80";
              return (
                <div key={booking._id} className="card flex flex-col md:flex-row overflow-hidden">
                  {booking.hotel && (
                    <div className="md:w-48 h-36 md:h-auto overflow-hidden flex-shrink-0">
                      <img src={image} alt={booking.hotel.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg ${color}`}>
                          <StatusIcon className="w-3 h-3" /> {booking.status}
                        </span>
                        <span className="text-slate-500 text-xs capitalize">{booking.bookingType}</span>
                      </div>
                      <h3 className="text-white font-semibold">{booking.hotel?.name || booking.package?.title || `Booking #${booking.bookingRef}`}</h3>
                      {booking.hotel?.location && (
                        <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-primary-400" /> {booking.hotel.location.city}
                        </p>
                      )}
                      {booking.checkIn && (
                        <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                          <Calendar className="w-3.5 h-3.5 text-primary-400" />
                          {new Date(booking.checkIn).toLocaleDateString()} → {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 text-xs">{booking.bookingRef}</div>
                      <div className="text-primary-400 font-bold text-xl">₹{booking.finalAmount?.toLocaleString()}</div>
                      <div className="text-slate-500 text-xs">{booking.paymentStatus}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}