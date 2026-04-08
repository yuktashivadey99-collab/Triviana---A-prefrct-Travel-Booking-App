import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Tag, Clock, Users } from "lucide-react";

/* ── Season data ──────────────────────────────────────────── */
const SEASONS = ["All","Summer","Monsoon","Winter","Festive"];

const DEALS = [
  {
    id:1, season:"Summer",
    title:"Save Big with Kesari's Pre-Booked Special Rates",
    subtitle:"Including Airfare",
    image:"https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80",
    destinations:[
      { name:"Nepal",     img:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&q=70", nights:"5D/4N", price:"₹80,000" },
      { name:"Bhutan",    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=70", nights:"5D/4N", price:"₹99,000" },
      { name:"Maldives",  img:"https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=200&q=70", nights:"4D/3N", price:"₹95,455" },
      { name:"Mauritius", img:"https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=200&q=70", nights:"6D/5N", price:"₹1,32,753" },
      { name:"SE Asia",   img:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=200&q=70", nights:"7D/6N", price:"₹57,015" },
      { name:"Africa",    img:"https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=70", nights:"8D/7N", price:"₹2,15,000" },
    ],
    badge:"⛱️ Summer Holidays",
    badgeColor:"bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    discount:"Save up to 40%",
    expiresIn:"12 days",
  },
  {
    id:2, season:"Monsoon",
    title:"Monsoon Magic — Misty Hills & Waterfalls",
    subtitle:"All-Inclusive Packages",
    image:"https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    destinations:[
      { name:"Coorg",    img:"https://images.unsplash.com/photo-1590080875852-b82c4e7e6f17?w=200&q=70", nights:"3D/2N", price:"₹12,000" },
      { name:"Munnar",   img:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&q=70", nights:"4D/3N", price:"₹15,500" },
      { name:"Shillong", img:"https://images.unsplash.com/photo-1562613572-6eadef4f6b3b?w=200&q=70", nights:"5D/4N", price:"₹22,000" },
      { name:"Lonavala", img:"https://images.unsplash.com/photo-1623059378888-b978de55e15f?w=200&q=70", nights:"2D/1N", price:"₹8,000" },
      { name:"Wayanad",  img:"https://images.unsplash.com/photo-1558618047-3c8c76cfb70d?w=200&q=70", nights:"3D/2N", price:"₹13,500" },
      { name:"Meghalaya",img:"https://images.unsplash.com/photo-1570625914665-810eaabb5c3f?w=200&q=70", nights:"6D/5N", price:"₹28,000" },
    ],
    badge:"🌧️ Monsoon Specials",
    badgeColor:"bg-blue-500/20 text-blue-300 border-blue-500/30",
    discount:"Flat ₹5,000 off",
    expiresIn:"28 days",
  },
  {
    id:3, season:"Winter",
    title:"Winter Wonderland — Snow, Peace & Adventure",
    subtitle:"Best Prices of the Season",
    image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    destinations:[
      { name:"Manali",      img:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=200&q=70", nights:"5D/4N", price:"₹18,000" },
      { name:"Shimla",      img:"https://images.unsplash.com/photo-1580477371194-4b9d97c72a47?w=200&q=70", nights:"4D/3N", price:"₹14,500" },
      { name:"Gulmarg",     img:"https://images.unsplash.com/photo-1584036553516-bf83210aa16c?w=200&q=70", nights:"5D/4N", price:"₹32,000" },
      { name:"Auli",        img:"https://images.unsplash.com/photo-1547470613-5f50cdb1a2e1?w=200&q=70", nights:"4D/3N", price:"₹16,000" },
      { name:"Darjeeling",  img:"https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=200&q=70", nights:"5D/4N", price:"₹19,000" },
      { name:"Switzerland", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=70", nights:"7D/6N", price:"₹1,25,000" },
    ],
    badge:"❄️ Winter Wonders",
    badgeColor:"bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    discount:"Early Bird 30% off",
    expiresIn:"45 days",
  },
  {
    id:4, season:"Festive",
    title:"Diwali & New Year Special Tours",
    subtitle:"Celebrate in Style",
    image:"https://images.unsplash.com/photo-1563897539633-7374c7f48019?w=600&q=80",
    destinations:[
      { name:"Rajasthan", img:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200&q=70", nights:"6D/5N", price:"₹35,000" },
      { name:"Varanasi",  img:"https://images.unsplash.com/photo-1561361058-c24e6f84e8f1?w=200&q=70", nights:"4D/3N", price:"₹18,500" },
      { name:"Bangkok",   img:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=200&q=70", nights:"5D/4N", price:"₹45,000" },
      { name:"Dubai",     img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=70", nights:"5D/4N", price:"₹72,000" },
      { name:"Singapore", img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=200&q=70", nights:"6D/5N", price:"₹65,000" },
      { name:"Bali",      img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=70", nights:"7D/6N", price:"₹58,000" },
    ],
    badge:"🪔 Festive Season",
    badgeColor:"bg-orange-500/20 text-orange-300 border-orange-500/30",
    discount:"Special festive prices",
    expiresIn:"60 days",
  },
];

function DestCard({ dest }) {
  return (
    <div className="flex-shrink-0 w-36 group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden h-24 mb-2">
        <img src={dest.img} alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <p className="text-white font-bold text-xs leading-tight">{dest.name}</p>
          <p className="text-slate-400 text-[10px]">{dest.nights}</p>
        </div>
        <div className="absolute top-2 right-2 bg-dark-900/80 backdrop-blur-sm rounded-md px-1.5 py-0.5">
          <p className="text-primary-300 text-[9px] font-bold whitespace-nowrap">
            Starts ₹{dest.price.replace("₹","")}
          </p>
        </div>
      </div>
    </div>
  );
}

function DealCard({ deal }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });
  };

  return (
    <div className="card deal-card-shine relative overflow-hidden group">
      {/* Header */}
      <div className="relative h-36 overflow-hidden">
        <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/40 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className={`badge border text-xs ${deal.badgeColor}`}>{deal.badge}</span>
            <div className="flex flex-col items-end gap-1">
              <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">{deal.discount}</span>
              <span className="flex items-center gap-1 text-slate-400 text-[10px]">
                <Clock className="w-3 h-3" /> Expires in {deal.expiresIn}
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{deal.title}</h3>
            <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
              <Tag className="w-3 h-3" /> {deal.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Destination scroll */}
      <div className="relative px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">
            {deal.destinations.length} destinations available
          </span>
          <div className="flex gap-1">
            <button onClick={()=>scroll(-1)}
              className="w-6 h-6 rounded-full bg-dark-700 hover:bg-primary-500 flex items-center justify-center transition-all">
              <ChevronLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={()=>scroll(1)}
              className="w-6 h-6 rounded-full bg-dark-700 hover:bg-primary-500 flex items-center justify-center transition-all">
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {deal.destinations.map(d => <DestCard key={d.name} dest={d} />)}
        </div>
      </div>

      <div className="px-4 pb-4">
        <button className="btn-primary w-full py-2.5 text-sm rounded-xl">
          View All Packages <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function SeasonalDeals() {
  const [active, setActive] = useState("All");
  const deals = active === "All" ? DEALS : DEALS.filter(d => d.season === active);

  return (
    <section className="section-pad bg-dark-900">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="badge-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              Season&apos;s Best Deals
            </div>
            <h2 className="section-title">
              Save Big with <span className="gradient-text">Curated Packages</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl">
              Season-smart deals powered by real-time pricing. The best offers, right on time.
            </p>
          </div>

          {/* Season filter */}
          <div className="flex gap-2 flex-wrap">
            {SEASONS.map(s => (
              <button key={s} onClick={() => setActive(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  active === s
                    ? "bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/30"
                    : "border-dark-600 text-slate-400 hover:text-white hover:border-dark-500"
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {deals.map(d => <DealCard key={d.id} deal={d} />)}
        </div>
      </div>
    </section>
  );
}
