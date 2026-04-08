import { useState } from "react";
import { PlaneTakeoff, MapPin, Calendar, Users, Search, ArrowRight, CheckCircle2 } from "lucide-react";

const TOP_ROUTES = [
  { from:"Delhi", to:"Mumbai", price:4500, time:"2h 10m", airline:"IndiGo" },
  { from:"Bangalore", to:"Delhi", price:5200, time:"2h 45m", airline:"Vistara" },
  { from:"Mumbai", to:"Goa", price:2800, time:"1h 15m", airline:"Air India" },
  { from:"Chennai", to:"Hyderabad", price:3100, time:"1h 05m", airline:"IndiGo" },
];

export default function Flights() {
  const [tripType, setTripType] = useState("one-way");
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Hero */}
        <div className="relative rounded-3xl overflow-hidden h-72 mb-10 flex items-center justify-center group">
          <img src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1200&q=80" alt="Flights" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-900/60 to-dark-900" />
          <div className="relative z-10 text-center px-4">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Book Your <span className="gradient-text">Flight</span></h1>
            <p className="text-slate-300 max-w-xl mx-auto">Compare prices across 500+ airlines worldwide and book the cheapest flights instantly with zero hidden fees.</p>
          </div>
        </div>

        {/* Search Booking Engine */}
        <div className="card p-6 md:p-8 -mt-20 relative z-20 shadow-2xl border border-white/10 mb-16">
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/5">
            <div className="flex gap-4">
              {["one-way", "round-trip", "multi-city"].map((type) => (
                <button key={type} onClick={() => setTripType(type)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${tripType === type ? "text-primary-400" : "text-slate-400 hover:text-white"}`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${tripType === type ? "border-primary-400" : "border-slate-500"}`}>
                    {tripType === type && <div className="w-2 h-2 rounded-full bg-primary-400" />}
                  </div>
                  <span className="capitalize">{type.replace("-", " ")}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1 border border-dark-600 rounded-2xl p-3 bg-dark-800/50 hover:border-primary-500/50 transition-colors">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">From</span>
              <div className="flex items-center gap-2">
                <PlaneTakeoff className="w-5 h-5 text-primary-400" />
                <input type="text" placeholder="Delhi (DEL)" className="bg-transparent border-none outline-none text-white font-semibold w-full" />
              </div>
            </div>
            
            <div className="lg:col-span-1 border border-dark-600 rounded-2xl p-3 bg-dark-800/50 hover:border-primary-500/50 transition-colors">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">To</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <input type="text" placeholder="Mumbai (BOM)" className="bg-transparent border-none outline-none text-white font-semibold w-full" />
              </div>
            </div>

            <div className="lg:col-span-1 border border-dark-600 rounded-2xl p-3 bg-dark-800/50 hover:border-primary-500/50 transition-colors">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Departure</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                <input type="date" className="bg-transparent border-none outline-none text-white font-semibold w-full [color-scheme:dark]" />
              </div>
            </div>

            <div className="lg:col-span-1 border border-dark-600 rounded-2xl p-3 bg-dark-800/50 hover:border-primary-500/50 transition-colors">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Travellers & Class</span>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <div className="text-white font-semibold text-sm w-full truncate">{passengers} Traveller, Economy</div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <button className="w-full h-full min-h-[64px] bg-gradient-to-r from-primary-500 to-orange-500 hover:from-primary-400 hover:to-orange-400 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.02]">
                <Search className="w-5 h-5" /> Search Flights
              </button>
            </div>
          </div>
        </div>

        {/* Flight Offers */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Popular <span className="gradient-text">Routes</span></h2>
              <p className="text-slate-400 mt-2">Explore the most booked domestic flights with amazing discounts.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_ROUTES.map((route, i) => (
              <div key={i} className="card p-5 group hover:-translate-y-1 transition-transform cursor-pointer border border-white/5 hover:border-primary-500/30">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center">
                    <PlaneTakeoff className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{route.airline}</span>
                </div>
                <div className="flex items-center justify-between mb-3 text-white font-semibold">
                  <span className="text-lg">{route.from}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-lg">{route.to}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <div className="text-sm text-slate-400 font-medium">Non-stop • {route.time}</div>
                  <div className="text-primary-400 font-bold text-lg">₹{route.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
