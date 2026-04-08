import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, ChevronDown, ChevronRight, TrendingUp, ArrowRight } from "lucide-react";

/* ── Popular domestic city pairs ─────────────────────────── */
const CITIES_WITH_AIRPORTS = [
  { label: "Mumbai (BOM)",      value: "Mumbai",      code: "BOM", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=200&q=70" },
  { label: "Delhi (DEL)",       value: "Delhi",        code: "DEL", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&q=70" },
  { label: "Bengaluru (BLR)",   value: "Bengaluru",    code: "BLR", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=200&q=70" },
  { label: "Hyderabad (HYD)",   value: "Hyderabad",    code: "HYD", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=70" },
  { label: "Chennai (MAA)",     value: "Chennai",      code: "MAA", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&q=70" },
  { label: "Kolkata (CCU)",     value: "Kolkata",      code: "CCU", img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=200&q=70" },
  { label: "Goa (GOI)",         value: "Goa",          code: "GOI", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=70" },
  { label: "Jaipur (JAI)",      value: "Jaipur",       code: "JAI", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200&q=70" },
  { label: "Pune (PNQ)",        value: "Pune",         code: "PNQ", img: "https://images.unsplash.com/photo-1609920619916-26f72e6c2d46?w=200&q=70" },
  { label: "Ahmedabad (AMD)",   value: "Ahmedabad",    code: "AMD", img: "https://images.unsplash.com/photo-1609348495849-dd44f97bcb0b?w=200&q=70" },
  { label: "Kochi (COK)",       value: "Kochi",        code: "COK", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&q=70" },
  { label: "Lucknow (LKO)",     value: "Lucknow",      code: "LKO", img: "https://images.unsplash.com/photo-1635508004507-e3dd05af6dc5?w=200&q=70" },
];

/* Popular routes per city */
const POPULAR_ROUTES = {
  Mumbai: [
    { to: "Goa",       price: "₹2,499", duration: "1h 5m", airline: "IndiGo",     img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=75", tag:"Trending" },
    { to: "Delhi",     price: "₹3,199", duration: "2h 10m", airline: "Air India",  img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=75", tag:"Popular" },
    { to: "Bengaluru", price: "₹2,699", duration: "1h 45m", airline: "SpiceJet",  img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=75" },
    { to: "Jaipur",    price: "₹2,899", duration: "1h 50m", airline: "IndiGo",    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=75", tag:"Weekend Getaway" },
    { to: "Chennai",   price: "₹3,499", duration: "2h 5m",  airline: "Vistara",   img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=75" },
    { to: "Kochi",     price: "₹3,999", duration: "2h 15m", airline: "Air India",  img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=75" },
  ],
  Delhi: [
    { to: "Goa",       price: "₹3,599", duration: "2h 30m", airline: "IndiGo",     img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=75", tag:"Trending" },
    { to: "Mumbai",    price: "₹3,199", duration: "2h 10m", airline: "Air India",   img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=75", tag:"Popular" },
    { to: "Manali",    price: "₹4,299", duration: "1h 20m", airline: "SpiceJet",    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=75" },
    { to: "Jaipur",    price: "₹1,899", duration: "45m",    airline: "IndiGo",      img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=75", tag:"Quick Trip" },
    { to: "Hyderabad", price: "₹3,799", duration: "2h",     airline: "Vistara",     img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=75" },
    { to: "Bengaluru", price: "₹3,299", duration: "2h 45m", airline: "Air India",   img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=75" },
  ],
};
/* default for other cities */
const DEFAULT_ROUTES = (city) => [
  { to: "Mumbai", price: "₹2,999", duration: "1h 45m", airline: "IndiGo",   img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=75", tag:"Popular" },
  { to: "Delhi",  price: "₹3,299", duration: "2h 10m", airline: "Air India", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=75" },
  { to: "Goa",    price: "₹2,599", duration: "1h 20m", airline: "SpiceJet",  img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=75", tag:"Trending" },
  { to: "Jaipur", price: "₹2,799", duration: "1h 50m", airline: "IndiGo",    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=75" },
];

function RouteCard({ route, from, navigate }) {
  return (
    <div onClick={() => navigate(`/flights?from=${from}&to=${route.to}`)}
      className="card group cursor-pointer overflow-hidden hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-36 overflow-hidden">
        <img src={route.img} alt={route.to}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
        {route.tag && (
          <div className="absolute top-3 left-3">
            <span className="badge-orange text-[10px] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {route.tag}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <p className="text-white font-bold text-sm">{route.to}</p>
            <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
              <Plane className="w-3 h-3" /> {route.duration} · {route.airline}
            </p>
          </div>
          <div className="text-right">
            <p className="text-primary-300 font-bold text-base leading-tight">{route.price}</p>
            <p className="text-slate-500 text-[10px]">per person</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DomesticFlights() {
  const [selectedCity, setCity] = useState(CITIES_WITH_AIRPORTS[0]);
  const [open, setOpen]         = useState(false);
  const navigate                = useNavigate();

  const routes = POPULAR_ROUTES[selectedCity.value] ?? DEFAULT_ROUTES(selectedCity.value);

  return (
    <section className="section-pad bg-dark-800">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="badge-orange mb-3">
              <Plane className="w-3.5 h-3.5" /> Domestic Flights
            </div>
            <h2 className="section-title">
              Flights from <span className="gradient-text">Popular Cities</span>
            </h2>
            <p className="text-slate-400 mt-2">Lowest fares on top routes — book before they go!</p>
          </div>

          {/* City dropdown */}
          <div className="relative">
            <button onClick={() => setOpen(!open)}
              className="flex items-center gap-3 glass border border-dark-600 hover:border-primary-500/50 px-4 py-3 rounded-xl transition-all min-w-[220px]">
              <img src={selectedCity.img} alt={selectedCity.value}
                className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-white font-semibold text-sm leading-tight">{selectedCity.value}</p>
                <p className="text-slate-500 text-xs">{selectedCity.code}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open?"rotate-180":""}`} />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-72 glass-dark border border-dark-600 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-up">
                <div className="p-2 max-h-72 overflow-y-auto hide-scrollbar">
                  {CITIES_WITH_AIRPORTS.map(city => (
                    <button key={city.value} onClick={() => { setCity(city); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        city.value === selectedCity.value
                          ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
                          : "text-slate-300 hover:bg-dark-700 hover:text-white"
                      }`}>
                      <img src={city.img} alt={city.value} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="font-medium leading-tight">{city.value}</p>
                        <p className="text-slate-500 text-xs">{city.code}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Route cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {routes.map(r => (
            <RouteCard key={r.to} route={r} from={selectedCity.value} navigate={navigate} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={() => navigate(`/flights?from=${selectedCity.value}`)}
            className="btn-outline gap-2">
            View all flights from {selectedCity.value} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
