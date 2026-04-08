import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import { fetchHotels } from "../store/slices/hotelSlice";
import { Star, MapPin, Filter, SlidersHorizontal, Search } from "lucide-react";

function HotelCard({ hotel }) {
  const image = hotel.images?.[0]?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80";
  return (
    <Link to={`/hotels/${hotel._id}`} className="card flex flex-col md:flex-row overflow-hidden group hover:-translate-y-0.5 transition-transform">
      <div className="relative md:w-72 h-52 md:h-auto overflow-hidden flex-shrink-0">
        <img src={image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {hotel.discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-lg">{hotel.discountPercent}% OFF</div>
        )}
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-white text-lg group-hover:text-primary-400 transition-colors">{hotel.name}</h3>
              <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                <MapPin className="w-3.5 h-3.5 text-primary-400" />
                {hotel.location?.city}, {hotel.location?.country}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-primary-500/15 px-2 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-primary-400 text-primary-400" />
              <span className="text-primary-400 font-semibold text-sm">{hotel.avgRating?.toFixed(1) || "New"}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {hotel.amenities?.slice(0, 4).map((a) => (
              <span key={a} className="text-xs bg-dark-700 text-slate-300 px-2 py-1 rounded-lg capitalize">{a}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-700">
          <div>
            <span className="text-primary-400 font-bold text-xl">₹{hotel.pricePerNight?.toLocaleString()}</span>
            <span className="text-slate-500 text-sm"> /night</span>
            {hotel.originalPrice && <div className="text-slate-500 text-xs line-through">₹{hotel.originalPrice?.toLocaleString()}</div>}
          </div>
          <span className="btn-primary text-sm py-2">Book Now</span>
        </div>
      </div>
    </Link>
  );
}

export default function Hotels() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { hotels, loading, total, pages } = useSelector((s) => s.hotels);
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    minPrice: "", maxPrice: "", rating: "", category: "", page: 1,
  });

  useEffect(() => { dispatch(fetchHotels(filters)); }, [filters, dispatch]);

  const categories = ["budget", "standard", "deluxe", "luxury", "resort", "villa", "boutique"];

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title mb-2">Find Your Perfect Stay</h1>
          <p className="text-slate-400">{total} hotels found {filters.city && `in ${filters.city}`}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card p-5 sticky top-24 space-y-6">
              <div className="flex items-center gap-2 text-white font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-primary-400" /> Filters
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-2 block">City</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search city..." value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value, page: 1 })}
                    className="input-field pl-9 text-sm" />
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-2 block">Price Range (₹)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })}
                    className="input-field text-sm w-full" />
                  <input type="number" placeholder="Max" value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
                    className="input-field text-sm w-full" />
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-2 block">Min Rating</label>
                <div className="flex gap-2">
                  {[3, 4, 4.5].map((r) => (
                    <button key={r} onClick={() => setFilters({ ...filters, rating: filters.rating == r ? "" : r, page: 1 })}
                      className={`flex-1 py-1.5 rounded-lg text-sm transition-all ${filters.rating == r ? "bg-primary-500 text-white" : "bg-dark-700 text-slate-400 hover:text-white"}`}>
                      {r}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button key={c} onClick={() => setFilters({ ...filters, category: filters.category === c ? "" : c, page: 1 })}
                      className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${filters.category === c ? "bg-primary-500 text-white" : "bg-dark-700 text-slate-400 hover:text-white"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setFilters({ city: "", minPrice: "", maxPrice: "", rating: "", category: "", page: 1 })}
                className="w-full py-2 text-sm text-red-400 hover:text-red-300 border border-red-400/30 rounded-xl transition-all">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="card h-52 shimmer" />
                ))}
              </div>
            ) : hotels.length === 0 ? (
              <div className="card p-16 text-center">
                <div className="text-5xl mb-4">🏨</div>
                <h3 className="text-white font-semibold text-xl mb-2">No hotels found</h3>
                <p className="text-slate-400">Try adjusting your filters or search a different city</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {[...Array(pages)].map((_, i) => (
                      <button key={i} onClick={() => setFilters({ ...filters, page: i + 1 })}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${filters.page === i + 1 ? "bg-primary-500 text-white" : "bg-dark-700 text-slate-400 hover:text-white"}`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}