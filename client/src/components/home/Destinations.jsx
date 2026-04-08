import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const DESTINATIONS = [
  {
    city: "Goa", country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    hotels: 234, tag:"Beach Paradise", span:"row-span-2"
  },
  {
    city: "Jaipur", country: "India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
    hotels: 312, tag:"Heritage City"
  },
  {
    city: "Manali", country: "India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    hotels: 145, tag:"Hill Station"
  },
  {
    city: "Mumbai", country: "India",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
    hotels: 567, tag:"City of Dreams"
  },
  {
    city: "Kerala", country: "India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    hotels: 198, tag:"God's Own Country"
  },
  {
    city: "Delhi", country: "India",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
    hotels: 489, tag:"Capital City"
  },
];

export default function Destinations() {
  const navigate = useNavigate();

  return (
    <section className="section-pad bg-dark-900">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="badge-orange mb-3">
              <MapPin className="w-3.5 h-3.5" /> Explore India
            </div>
            <h2 className="section-title">
              Popular <span className="gradient-text">Destinations</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl">
              From snow-capped mountains to sun-kissed beaches — find your perfect Indian getaway.
            </p>
          </div>
          <button onClick={() => navigate("/hotels")} className="btn-outline gap-2 flex-shrink-0">
            Explore all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <button
              key={dest.city}
              onClick={() => navigate(`/hotels?city=${dest.city}`)}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer text-left ${
                i === 0 ? "row-span-2" : ""
              }`}
              style={{ height: i === 0 ? "auto" : "180px", minHeight: i === 0 ? "380px" : undefined }}
            >
              {/* Image */}
              <img src={dest.image} alt={dest.city}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-900/30 to-dark-900/10 group-hover:from-dark-950/80 transition-all duration-500" />

              {/* 3D shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{background:"linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)"}} />

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="glass text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10">
                  {dest.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-bold text-white text-xl leading-tight">{dest.city}</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary-400" />
                      {dest.hotels}+ hotels available
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}