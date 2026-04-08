import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFeaturedHotels } from "../../store/slices/hotelSlice";
import { Star, MapPin, ArrowRight, Wifi, Car, Coffee, Heart } from "lucide-react";

const FALLBACK = [
  { name:"The Leela Palace, Udaipur",    city:"Udaipur",  price:18500, stars:5, rating:4.9, reviews:1240, category:"luxury",  discount:15, img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
  { name:"Taj Falaknuma Palace",          city:"Hyderabad",price:22000, stars:5, rating:4.8, reviews:890,  category:"palace",  discount:0,  img:"https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80" },
  { name:"W Goa — Vagator Beach Resort", city:"Goa",      price:9500,  stars:4, rating:4.7, reviews:2100, category:"resort",  discount:20, img:"https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80" },
  { name:"The Oberoi Cecil, Shimla",     city:"Shimla",   price:12000, stars:5, rating:4.6, reviews:567,  category:"heritage",discount:10, img:"https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=600&q=80" },
];

function HotelCard({ hotel, fallback }) {
  const name     = hotel.name     ?? fallback.name;
  const city     = hotel.location?.city ?? fallback.city;
  const price    = hotel.pricePerNight ?? fallback.price;
  const stars    = hotel.starRating ?? fallback.stars;
  const rating   = hotel.avgRating ?? fallback.rating;
  const reviews  = hotel.totalReviews ?? fallback.reviews;
  const category = hotel.category ?? fallback.category;
  const discount = hotel.discountPercent ?? fallback.discount;
  const image    = hotel.images?.[0]?.url ?? fallback.img;
  const id       = hotel._id ?? fallback.name;

  return (
    <Link to={`/hotels/${id}`} className="card group overflow-hidden block hover:-translate-y-2 transition-all duration-400">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img src={image} alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-900/20 to-transparent" />

        {/* Badges */}
        {discount > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg">
              {discount}% OFF
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <div className="glass text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
            {typeof rating === "number" ? rating.toFixed(1) : "New"}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="w-7 h-7 glass rounded-full flex items-center justify-center border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 transition-all">
            <Heart className="w-3.5 h-3.5 text-slate-400 hover:text-red-400 transition-colors" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
          <MapPin className="w-3 h-3 text-primary-400" />
          <span className="font-medium">{city}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white text-sm leading-snug group-hover:text-primary-300 transition-colors line-clamp-2 flex-1">
            {name}
          </h3>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-slate-500 text-xs ml-1">({reviews?.toLocaleString()} reviews)</span>
        </div>

        {/* Amenity icons */}
        <div className="flex items-center gap-2 mb-3">
          {[Wifi, Car, Coffee].map((Icon, i) => (
            <div key={i} className="w-6 h-6 bg-dark-700 rounded-md flex items-center justify-center">
              <Icon className="w-3 h-3 text-slate-400" />
            </div>
          ))}
          <span className="text-slate-500 text-xs">+more amenities</span>
        </div>

        {/* Price + category */}
        <div className="flex items-center justify-between">
          <div>
            {discount > 0 && (
              <span className="text-slate-500 text-xs line-through mr-1.5">
                ₹{Math.round(price * 100 / (100 - discount)).toLocaleString()}
              </span>
            )}
            <span className="text-primary-400 font-bold text-lg">₹{price?.toLocaleString()}</span>
            <span className="text-slate-500 text-xs">/night</span>
          </div>
          <span className="text-[10px] text-slate-400 capitalize bg-dark-700 px-2 py-0.5 rounded-lg border border-dark-600">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="h-48 shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 shimmer rounded w-3/4" />
        <div className="h-3 shimmer rounded w-1/2" />
        <div className="h-3 shimmer rounded w-2/3" />
        <div className="flex justify-between">
          <div className="h-5 shimmer rounded w-1/3" />
          <div className="h-5 shimmer rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedHotels() {
  const dispatch = useDispatch();
  const { featured, loading } = useSelector((s) => s.hotels);

  useEffect(() => { dispatch(fetchFeaturedHotels()); }, []);

  const cards = featured?.length > 0
    ? featured.slice(0, 4).map((h, i) => ({ hotel: h, fallback: FALLBACK[i % FALLBACK.length] }))
    : FALLBACK.map(fb => ({ hotel: {}, fallback: fb }));

  return (
    <section className="section-pad bg-dark-800">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="badge-orange mb-3"><Star className="w-3.5 h-3.5" /> Handpicked for You</div>
            <h2 className="section-title">
              Featured <span className="gradient-text">Hotels & Resorts</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl">
              Luxury properties, boutique stays, and unique experiences — all verified by our experts.
            </p>
          </div>
          <Link to="/hotels" className="hidden md:flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : cards.map(({ hotel, fallback }, i) => (
                <HotelCard key={i} hotel={hotel} fallback={fallback} />
              ))
          }
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/hotels" className="btn-outline gap-2 inline-flex">
            View all hotels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}