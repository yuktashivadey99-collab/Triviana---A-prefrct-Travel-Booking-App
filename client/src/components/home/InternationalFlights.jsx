import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, ChevronDown, ArrowRight, Flame, Star } from "lucide-react";

const INTL_CITIES = [
  { label: "Delhi (DEL)",     value: "Delhi",     code: "DEL", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&q=70" },
  { label: "Mumbai (BOM)",    value: "Mumbai",    code: "BOM", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=200&q=70" },
  { label: "Bengaluru (BLR)", value: "Bengaluru", code: "BLR", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=200&q=70" },
  { label: "Chennai (MAA)",   value: "Chennai",   code: "MAA", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&q=70" },
  { label: "Hyderabad (HYD)", value: "Hyderabad", code: "HYD", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=70" },
];

const INTL_ROUTES = {
  Delhi: [
    { to:"Dubai",     country:"UAE",         price:"₹18,500", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=75", rating:4.8, tag:"🔥 Hot" },
    { to:"Bangkok",   country:"Thailand",    price:"₹22,000", img:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=75", rating:4.7, tag:"Popular" },
    { to:"Singapore", country:"Singapore",   price:"₹28,000", img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=75", rating:4.9 },
    { to:"London",    country:"UK",          price:"₹52,000", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=75", rating:4.6 },
    { to:"Paris",     country:"France",      price:"₹58,000", img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=75", rating:4.9, tag:"⭐ Premium" },
    { to:"New York",  country:"USA",         price:"₹72,000", img:"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=75", rating:4.8 },
  ],
  Mumbai: [
    { to:"Dubai",     country:"UAE",         price:"₹16,500", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=75", rating:4.8, tag:"🔥 Hot" },
    { to:"Maldives",  country:"Maldives",    price:"₹28,000", img:"https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=75", rating:5.0, tag:"⭐ Luxury" },
    { to:"Bangkok",   country:"Thailand",    price:"₹24,000", img:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=75", rating:4.7 },
    { to:"Bali",      country:"Indonesia",   price:"₹32,000", img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=75", rating:4.8, tag:"Popular" },
    { to:"Singapore", country:"Singapore",   price:"₹29,000", img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=75", rating:4.9 },
    { to:"London",    country:"UK",          price:"₹55,000", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=75", rating:4.6 },
  ],
};

const DEFAULT_INTL = [
  { to:"Dubai",     country:"UAE",       price:"₹18,000", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=75", rating:4.8, tag:"🔥 Hot" },
  { to:"Bangkok",   country:"Thailand",  price:"₹22,000", img:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=75", rating:4.7 },
  { to:"Singapore", country:"Singapore", price:"₹28,000", img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=75", rating:4.9 },
  { to:"Bali",      country:"Indonesia", price:"₹30,000", img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=75", rating:4.8, tag:"Popular" },
  { to:"Maldives",  country:"Maldives",  price:"₹35,000", img:"https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=75", rating:5.0, tag:"⭐ Luxury" },
  { to:"London",    country:"UK",        price:"₹52,000", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=75", rating:4.6 },
];

function IntlCard({ route, from, navigate }) {
  return (
    <div onClick={() => navigate(`/flights?from=${from}&to=${route.to}&type=international`)}
      className="card-3d card group cursor-pointer overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        <img src={route.img} alt={route.to}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-900/30 to-transparent" />
        {route.tag && (
          <div className="absolute top-3 left-3">
            <span className="glass text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/15">
              {route.tag}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-dark-900/70 backdrop-blur-sm rounded-full px-2 py-0.5">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-xs font-bold">{route.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{route.to}</h3>
            <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
              <Globe className="w-3 h-3" /> {route.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-primary-400 font-bold text-base">{route.price}</p>
          </div>
        </div>
        <button className="mt-3 w-full btn-outline py-1.5 text-xs rounded-xl gap-1 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all">
          Book Now <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default function InternationalFlights() {
  const [selectedCity, setCity] = useState(INTL_CITIES[0]);
  const [open, setOpen]         = useState(false);
  const navigate                = useNavigate();

  const routes = INTL_ROUTES[selectedCity.value] ?? DEFAULT_INTL;

  return (
    <section className="section-pad bg-dark-900">
      <div className="section-container">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="badge-blue mb-3">
              <Globe className="w-3.5 h-3.5" /> International Flights
            </div>
            <h2 className="section-title">
              Fly Abroad from <span className="gradient-text-cool">Your City</span>
            </h2>
            <p className="text-slate-400 mt-2">Best fares to top international destinations — book early, save more.</p>
          </div>

          {/* City selector */}
          <div className="relative">
            <button onClick={() => setOpen(!open)}
              className="flex items-center gap-3 glass border border-dark-600 hover:border-blue-500/50 px-4 py-3 rounded-xl transition-all min-w-[220px]">
              <img src={selectedCity.img} alt={selectedCity.value}
                className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-white font-semibold text-sm">{selectedCity.value}</p>
                <p className="text-slate-500 text-xs">{selectedCity.code}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open?"rotate-180":""}`} />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-68 glass-dark border border-dark-600 rounded-2xl shadow-2xl z-50 animate-fade-up overflow-hidden">
                <div className="p-2">
                  {INTL_CITIES.map(c => (
                    <button key={c.value} onClick={() => { setCity(c); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        c.value === selectedCity.value
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "text-slate-300 hover:bg-dark-700 hover:text-white"
                      }`}>
                      <img src={c.img} alt={c.value} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      <div className="text-left">
                        <p className="font-medium leading-tight">{c.value}</p>
                        <p className="text-slate-500 text-xs">{c.code}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {routes.map(r => <IntlCard key={r.to} route={r} from={selectedCity.value} navigate={navigate} />)}
        </div>

        <div className="text-center mt-8">
          <button onClick={() => navigate(`/flights?type=international&from=${selectedCity.value}`)}
            className="btn-outline gap-2">
            Explore all international routes <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
