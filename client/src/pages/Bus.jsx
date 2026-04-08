import { useState } from "react";
import { BusIcon, MapPin, Calendar, Search, ArrowRight } from "lucide-react";

export default function Bus() {
  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden h-72 mb-10 flex items-center justify-center group">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80" alt="Bus Booking" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/80 to-transparent" />
          <div className="relative z-10 text-center px-4 mt-12">
            <h1 className="font-display font-bold text-4xl leading-tight text-white mb-3">Intercity <span className="gradient-text">Bus Booking</span></h1>
            <p className="text-slate-300 max-w-xl mx-auto">10,000+ routes across the country. Volvo, AC Seater & Sleeper buses available instantly.</p>
          </div>
        </div>

        {/* Engine */}
        <div className="card p-6 md:p-8 -mt-16 relative z-20 shadow-2xl border border-white/10 max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-dark-600 rounded-2xl p-3 bg-dark-800/50 hover:border-primary-500/50 transition-colors">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Leaving From</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-400" />
                <input type="text" placeholder="Origin City" className="bg-transparent border-none outline-none text-white font-semibold w-full" />
              </div>
            </div>
            
            <div className="border border-dark-600 rounded-2xl p-3 bg-dark-800/50 hover:border-primary-500/50 transition-colors">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Going To</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" />
                <input type="text" placeholder="Destination City" className="bg-transparent border-none outline-none text-white font-semibold w-full" />
              </div>
            </div>

            <div className="border border-dark-600 rounded-2xl p-3 bg-dark-800/50 hover:border-primary-500/50 transition-colors">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Date of Travel</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <input type="date" className="bg-transparent border-none outline-none text-white font-semibold w-full [color-scheme:dark]" />
              </div>
            </div>

            <div>
              <button className="w-full h-full min-h-[64px] bg-gradient-to-r from-primary-500 to-orange-500 hover:from-primary-400 hover:to-orange-400 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]">
                <Search className="w-5 h-5" /> Search Buses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
