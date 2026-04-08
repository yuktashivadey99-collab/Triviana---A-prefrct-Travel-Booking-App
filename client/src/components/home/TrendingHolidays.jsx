import { useNavigate } from "react-router-dom";
import { Users, Star, Clock, ArrowRight, Calendar, MapPin } from "lucide-react";

const PACKAGES = [
  {
    id:1,
    title:"Rajasthan Royal Heritage Tour",
    image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    price:"₹35,000",
    perPerson:true,
    duration:"6D/5N",
    groupSize:"12-18",
    departures:["Apr 15","May 1","May 16","Jun 1"],
    rating:4.8,
    reviews:234,
    highlights:["Jaipur","Jodhpur","Udaipur"],
    inclusions:["Hotel","Flights","Meals","Guide"],
    badge:"Best Seller",
    badgeColor:"bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  {
    id:2,
    title:"Kerala Backwaters & Spice Trail",
    image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    price:"₹28,500",
    perPerson:true,
    duration:"5D/4N",
    groupSize:"8-15",
    departures:["Apr 20","May 5","May 25","Jun 8"],
    rating:4.9,
    reviews:189,
    highlights:["Munnar","Alleppey","Kochi"],
    inclusions:["Houseboat","Hotel","Meals","Transport"],
    badge:"Premium Pick",
    badgeColor:"bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id:3,
    title:"Himalayan Escapade — Manali & Spiti",
    image:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    price:"₹42,000",
    perPerson:true,
    duration:"7D/6N",
    groupSize:"10-14",
    departures:["May 10","Jun 1","Jun 15","Jul 1"],
    rating:4.7,
    reviews:156,
    highlights:["Manali","Kaza","Chandratal"],
    inclusions:["Hotel","Transport","Meals","Trekking Kit"],
    badge:"Adventure",
    badgeColor:"bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id:4,
    title:"Golden Triangle — Delhi·Agra·Jaipur",
    image:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    price:"₹22,000",
    perPerson:true,
    duration:"5D/4N",
    groupSize:"15-20",
    departures:["Every Fri","Every Mon"],
    rating:4.8,
    reviews:312,
    highlights:["Taj Mahal","Red Fort","Amber Fort"],
    inclusions:["Hotel","Flights","Meals","Guide"],
    badge:"Top Rated",
    badgeColor:"bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  {
    id:5,
    title:"Andaman Island Adventure",
    image:"https://images.unsplash.com/photo-1586861203927-800a5acdce4d?w=800&q=80",
    price:"₹55,000",
    perPerson:true,
    duration:"7D/6N",
    groupSize:"8-12",
    departures:["Apr 25","May 12","Jun 5"],
    rating:4.9,
    reviews:98,
    highlights:["Havelock","Neil Island","Port Blair"],
    inclusions:["Resort","Flights","Meals","Diving"],
    badge:"Island Escape",
    badgeColor:"bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    id:6,
    title:"Varanasi Spiritual Journey",
    image:"https://images.unsplash.com/photo-1561361058-c24e6f84e8f1?w=800&q=80",
    price:"₹18,000",
    perPerson:true,
    duration:"4D/3N",
    groupSize:"10-20",
    departures:["Weekends","Mon","Thu"],
    rating:4.6,
    reviews:267,
    highlights:["Kashi Vishwanath","Ganga Aarti","Sarnath"],
    inclusions:["Hotel","Train","Meals","Guide"],
    badge:"Cultural",
    badgeColor:"bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
];

function PackageCard({ pkg, navigate }) {
  return (
    <div className="card group overflow-hidden hover:-translate-y-2 transition-all duration-400 cursor-pointer"
      onClick={() => navigate(`/packages/${pkg.id}`)}>

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img src={pkg.image} alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge border text-[10px] ${pkg.badgeColor}`}>{pkg.badge}</span>
        </div>

        {/* Duration + group */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <span className="glass text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {pkg.duration}
          </span>
          <span className="glass text-white text-[10px] px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
            <Users className="w-3 h-3" /> {pkg.groupSize} pax
          </span>
        </div>

        {/* Highlights */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex gap-1.5 flex-wrap">
            {pkg.highlights.map(h => (
              <span key={h} className="text-[10px] bg-dark-900/80 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-primary-400" /> {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-snug group-hover:text-primary-300 transition-colors mb-2 line-clamp-2">
          {pkg.title}
        </h3>

        {/* Rating + reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_,i)=>(
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(pkg.rating) ? "fill-yellow-400 text-yellow-400" : "text-dark-600"}`} />
            ))}
          </div>
          <span className="text-yellow-400 text-xs font-bold">{pkg.rating}</span>
          <span className="text-slate-500 text-xs">({pkg.reviews} reviews)</span>
        </div>

        {/* Inclusions */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {pkg.inclusions.map(i => (
            <span key={i} className="text-[10px] bg-dark-700 text-slate-300 px-1.5 py-0.5 rounded-md">{i}</span>
          ))}
        </div>

        {/* Departures */}
        <div className="flex items-center gap-1.5 mb-4">
          <Calendar className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
          <span className="text-slate-400 text-xs">{pkg.departures.slice(0,3).join(" · ")}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary-400 font-bold text-lg">{pkg.price}</span>
            {pkg.perPerson && <span className="text-slate-500 text-xs"> /person</span>}
          </div>
          <button className="btn-primary py-1.5 px-3 text-xs rounded-xl gap-1">
            Book Now <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrendingHolidays() {
  const navigate = useNavigate();

  return (
    <section className="section-pad bg-dark-800">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="badge-green mb-3">
              <Users className="w-3.5 h-3.5" /> Group Holidays
            </div>
            <h2 className="section-title">
              Trending <span className="gradient-text">Group Packages</span>
            </h2>
            <p className="text-slate-400 mt-2">
              Carefully curated group tours with expert guides, fixed departures, and all-inclusive pricing.
            </p>
          </div>
          <button onClick={() => navigate("/holidays")} className="btn-outline gap-2 flex-shrink-0">
            All Packages <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map(pkg => <PackageCard key={pkg.id} pkg={pkg} navigate={navigate} />)}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-12 relative overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
            alt="custom tour" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-8 py-6 gap-4">
            <div>
              <h3 className="font-display font-bold text-white text-2xl">Can't find the right package?</h3>
              <p className="text-slate-300 mt-1 text-sm">Let our travel experts craft a custom itinerary for you — free of charge.</p>
            </div>
            <button className="btn-primary px-8 py-3 rounded-xl flex-shrink-0">
              Plan Custom Trip <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
