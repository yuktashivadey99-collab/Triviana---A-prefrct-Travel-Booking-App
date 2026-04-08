import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelById } from "../store/slices/hotelSlice";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Waves, ChevronLeft, ChevronRight, Check, Calendar, Users } from "lucide-react";
import toast from "react-hot-toast";

const amenityIcons = { wifi: Wifi, parking: Car, restaurant: Coffee, gym: Dumbbell, pool: Waves };

export default function HotelDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected: hotel, loading } = useSelector((s) => s.hotels);
  const { user } = useSelector((s) => s.auth);
  const [imgIndex, setImgIndex] = useState(0);
  const [booking, setBooking] = useState({ checkIn: "", checkOut: "", adults: 1, children: 0, roomId: "" });

  useEffect(() => { dispatch(fetchHotelById(id)); }, [id, dispatch]);

  const nights = booking.checkIn && booking.checkOut
    ? Math.max(0, Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)))
    : 0;

  const handleBook = async () => {
    if (!user) { navigate("/auth"); return; }
    if (!booking.checkIn || !booking.checkOut) { toast.error("Select check-in and check-out dates"); return; }
    if (nights < 1) { toast.error("Check-out must be after check-in"); return; }

    const baseAmount = hotel.pricePerNight * nights;
    navigate("/checkout", {
      state: {
        bookingData: {
          bookingType: "hotel", hotelId: hotel._id,
          roomId: booking.roomId || hotel.rooms?.[0]?._id,
          checkIn: booking.checkIn, checkOut: booking.checkOut,
          guests: { adults: booking.adults, children: booking.children },
          baseAmount, nights,
        },
        hotelName: hotel.name, hotelImage: hotel.images?.[0]?.url,
      },
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-dark-900 pt-20 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!hotel) return (
    <div className="min-h-screen bg-dark-900 pt-20 flex items-center justify-center">
      <div className="text-center"><p className="text-white text-xl">Hotel not found</p></div>
    </div>
  );

  const images = hotel.images?.length > 0
    ? hotel.images.map((img) => img.url)
    : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"];

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  {hotel.location?.address || hotel.location?.city}, {hotel.location?.country}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold">{hotel.avgRating?.toFixed(1) || "New"}</span>
                  <span className="text-slate-400 text-sm">({hotel.totalReviews} reviews)</span>
                </div>
                <span className="bg-primary-500/15 text-primary-400 text-sm px-3 py-1 rounded-full capitalize">{hotel.category}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-sm">Starting from</div>
              <div className="text-primary-400 font-bold text-3xl">₹{hotel.pricePerNight?.toLocaleString()}</div>
              <div className="text-slate-500 text-sm">per night</div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative rounded-2xl overflow-hidden h-96 md:h-[500px] mb-8 group">
          <img src={images[imgIndex]} alt={hotel.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/30 to-transparent" />
          {images.length > 1 && (
            <>
              <button onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-900/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-900/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-700">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? "bg-white w-6" : "bg-white/50"}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card p-6">
              <h2 className="font-semibold text-white text-xl mb-3">About this hotel</h2>
              <p className="text-slate-400 leading-relaxed">{hotel.description || "A wonderful place to stay with all modern amenities and excellent service."}</p>
            </div>

            {/* Amenities */}
            <div className="card p-6">
              <h2 className="font-semibold text-white text-xl mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(hotel.amenities?.length > 0 ? hotel.amenities : ["wifi", "parking", "restaurant", "gym", "pool", "ac"]).map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check;
                  return (
                    <div key={amenity} className="flex items-center gap-2 text-slate-300">
                      <div className="w-8 h-8 bg-primary-500/15 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary-400" />
                      </div>
                      <span className="text-sm capitalize">{amenity.replace("_", " ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Policies */}
            <div className="card p-6">
              <h2 className="font-semibold text-white text-xl mb-4">Hotel Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-700 rounded-xl p-4 text-center">
                  <p className="text-slate-400 text-xs mb-1">Check-in</p>
                  <p className="text-white font-semibold">{hotel.policies?.checkIn || "12:00 PM"}</p>
                </div>
                <div className="bg-dark-700 rounded-xl p-4 text-center">
                  <p className="text-slate-400 text-xs mb-1">Check-out</p>
                  <p className="text-white font-semibold">{hotel.policies?.checkOut || "11:00 AM"}</p>
                </div>
                <div className="bg-dark-700 rounded-xl p-4 text-center">
                  <p className="text-slate-400 text-xs mb-1">Cancellation</p>
                  <p className="text-white font-semibold text-xs">{hotel.policies?.cancellation || "Free cancellation"}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {hotel.reviews?.length > 0 && (
              <div className="card p-6">
                <h2 className="font-semibold text-white text-xl mb-4">Guest Reviews</h2>
                <div className="space-y-4">
                  {hotel.reviews.slice(0, 3).map((review) => (
                    <div key={review._id} className="border-b border-dark-700 pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
                          {review.user?.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{review.user?.name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-semibold text-white text-lg mb-4">Book Your Stay</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-sm mb-1 block flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Check-in</label>
                  <input type="date" value={booking.checkIn}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
                    className="input-field" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Check-out</label>
                  <input type="date" value={booking.checkOut}
                    min={booking.checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
                    className="input-field" />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Guests</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <select value={booking.adults} onChange={(e) => setBooking({ ...booking, adults: Number(e.target.value) })} className="input-field text-sm">
                        {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <select value={booking.children} onChange={(e) => setBooking({ ...booking, children: Number(e.target.value) })} className="input-field text-sm">
                        {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n} Child{n !== 1 ? "ren" : ""}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {nights > 0 && (
                <div className="mt-4 bg-dark-700 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">₹{hotel.pricePerNight?.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span>
                    <span className="text-white">₹{(hotel.pricePerNight * nights)?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Taxes (18%)</span>
                    <span className="text-white">₹{Math.round(hotel.pricePerNight * nights * 0.18)?.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-dark-600 pt-2 flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-primary-400">₹{Math.round(hotel.pricePerNight * nights * 1.18)?.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button onClick={handleBook} className="btn-primary w-full mt-4 text-center justify-center flex">
                {user ? "Book Now" : "Login to Book"}
              </button>
              <p className="text-center text-slate-500 text-xs mt-3">Free cancellation · No hidden fees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}