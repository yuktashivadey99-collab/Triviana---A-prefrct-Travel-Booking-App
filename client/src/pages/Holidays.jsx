import { useState } from "react";
import { Package, Calendar, Users, MapPin, Search, Star, Clock } from "lucide-react";

const PACKAGES = [
  { title:"Bali Island Retreat",  price:45000, days:"6D/5N", image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
  { title:"Swiss Alps Adventure", price:98000, days:"7D/6N", image:"https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80" },
  { title:"Dubai Skyline Tour",   price:35000, days:"5D/4N", image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { title:"Maldives Honeymoon",   price:85000, days:"4D/3N", image:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" },
];

export default function Holidays() {
  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden h-80 mb-12 group flex items-center px-8 md:px-16">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80" alt="Holidays" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-900/60 to-transparent" />
          
          <div className="relative z-10 max-w-2xl">
             <div className="bg-primary-500/20 w-max text-primary-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-primary-500/30">Curated Experiences</div>
             <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">Find Your Perfect <br/><span className="gradient-text">Holiday Package</span></h1>
             <p className="text-slate-300 mb-8 text-lg">Unforgettable trips, expertly planned. Just pack your bags and go.</p>
             
             <div className="flex bg-dark-800/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 max-w-lg">
                <div className="flex-1 flex items-center px-4">
                   <Search className="w-5 h-5 text-slate-400 mr-2" />
                   <input type="text" placeholder="Where to?" className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500" />
                </div>
                <button className="bg-primary-500 hover:bg-primary-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg">Explore</button>
             </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mb-12">
          <h2 className="section-title mb-8">Trending <span className="gradient-text">Global Packages</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {PACKAGES.map((pkg, i) => (
               <div key={i} className="card overflow-hidden group cursor-pointer border border-white/5 hover:border-primary-500/30 hover:-translate-y-2 transition-all">
                  <div className="h-48 relative overflow-hidden">
                     <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">Best Seller</div>
                     <div className="absolute bottom-3 right-3 glass text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 font-medium border border-white/20">
                        <Clock className="w-3 h-3" /> {pkg.days}
                     </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-primary-400 transition-colors">{pkg.title}</h3>
                    <div className="flex items-center gap-1 mb-4">
                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                       <span className="text-emerald-400 text-sm font-semibold border-b border-dashed border-emerald-400/50">4.9 Excellent</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                       <span className="text-[10px] bg-dark-700 text-slate-300 px-2 py-1 rounded uppercase tracking-wide">Flights</span>
                       <span className="text-[10px] bg-dark-700 text-slate-300 px-2 py-1 rounded uppercase tracking-wide">Hotel</span>
                       <span className="text-[10px] bg-dark-700 text-slate-300 px-2 py-1 rounded uppercase tracking-wide">Sightseeing</span>
                    </div>
                    <div className="flex items-end justify-between pt-4 border-t border-dark-600/50">
                       <div>
                          <div className="text-slate-500 text-xs mb-0.5">Starting from</div>
                          <div className="text-primary-400 font-bold text-xl">₹{pkg.price.toLocaleString()}</div>
                       </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
