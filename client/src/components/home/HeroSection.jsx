import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, Calendar, Users, Plane, Hotel, Package,
  Bus, Train, ArrowRight, ArrowLeftRight, ChevronDown, Sparkles
} from "lucide-react";

/* ── Data ──────────────────────────────────────────────────── */
const BG_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85",
    location: "Swiss Alps",
    country: "Switzerland",
  },
  {
    url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=85",
    location: "Maldives",
    country: "Indian Ocean",
  },
  {
    url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=85",
    location: "Taj Mahal",
    country: "Agra, India",
  },
  {
    url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=85",
    location: "Goa Beaches",
    country: "India",
  },
  {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=85",
    location: "Kyoto",
    country: "Japan",
  },
];

const TABS = [
  { id: "flights",  label: "Flights",  icon: Plane },
  { id: "hotels",   label: "Hotels",   icon: Hotel },
  { id: "holidays", label: "Holidays", icon: Package },
  { id: "buses",    label: "Bus",      icon: Bus },
  { id: "trains",   label: "Trains",   icon: Train },
];

const INDIAN_CITIES = [
  "Mumbai","Delhi","Bengaluru","Chennai","Hyderabad","Kolkata",
  "Pune","Ahmedabad","Jaipur","Goa","Kochi","Indore",
  "Chandigarh","Lucknow","Bhopal","Coimbatore","Surat","Visakhapatnam",
];

/* ── Sub-search forms ──────────────────────────────────────── */
function FlightSearch({ onSearch }) {
  const [trip, setTrip]       = useState("one-way");
  const [from, setFrom]       = useState("");
  const [to, setTo]           = useState("");
  const [depart, setDepart]   = useState("");
  const [returnD, setReturn]  = useState("");
  const [travellers, setTrav] = useState(1);
  const [cabin, setCabin]     = useState("Economy");

  const swap = () => { const t = from; setFrom(to); setTo(t); };

  return (
    <div className="space-y-4">
      {/* Trip type */}
      <div className="flex items-center gap-4 text-sm">
        {["one-way","round-trip","multi-city"].map((t) => (
          <label key={t} className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name="trip" value={t} checked={trip===t} onChange={() => setTrip(t)}
              className="accent-orange-500 w-4 h-4" />
            <span className={`font-medium capitalize transition-colors ${trip===t?"text-primary-400":"text-slate-400 group-hover:text-slate-200"}`}>
              {t.replace("-"," ")}
            </span>
          </label>
        ))}
        <div className="ml-auto flex items-center gap-2 text-slate-400">
          <span className="text-xs">Cabin:</span>
          <select value={cabin} onChange={e=>setCabin(e.target.value)}
            className="bg-dark-700 text-white text-xs rounded-lg px-2 py-1 border border-dark-600 focus:outline-none focus:border-primary-500">
            {["Economy","Business","First Class"].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Main fields */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* From */}
        <div className="md:col-span-3 relative group">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input list="city-list" placeholder="Departure city" value={from}
              onChange={e=>setFrom(e.target.value)}
              className="input-field pl-10 font-medium" />
          </div>
        </div>

        {/* Swap */}
        <div className="md:col-span-1 flex items-end justify-center pb-2">
          <button onClick={swap}
            className="w-9 h-9 rounded-full bg-dark-700 hover:bg-primary-500 border border-dark-600 hover:border-primary-500 flex items-center justify-center transition-all group">
            <ArrowLeftRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* To */}
        <div className="md:col-span-3 relative group">
          <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
            <input list="city-list" placeholder="Arrival city" value={to}
              onChange={e=>setTo(e.target.value)}
              className="input-field pl-10 font-medium" />
          </div>
        </div>

        {/* Depart */}
        <div className="md:col-span-2">
          <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">Depart</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input type="date" value={depart} onChange={e=>setDepart(e.target.value)}
              className="input-field pl-10" />
          </div>
        </div>

        {/* Return */}
        {trip === "round-trip" && (
          <div className="md:col-span-2">
            <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
              <input type="date" value={returnD} onChange={e=>setReturn(e.target.value)}
                className="input-field pl-10" />
            </div>
          </div>
        )}

        {/* Search */}
        <div className={`${trip==="round-trip"?"md:col-span-1":"md:col-span-3"} flex items-end`}>
          <button onClick={() => onSearch({ from,to,depart,returnD,travellers,cabin,trip })}
            className="btn-primary w-full py-3 rounded-xl text-sm font-bold gap-2 shadow-lg shadow-primary-500/30">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      <datalist id="city-list">
        {INDIAN_CITIES.map(c=><option key={c} value={c} />)}
      </datalist>
    </div>
  );
}

function HotelSearch({ onSearch }) {
  const [city, setCity]       = useState("");
  const [checkIn, setIn]      = useState("");
  const [checkOut, setOut]    = useState("");
  const [rooms, setRooms]     = useState(1);
  const [guests, setGuests]   = useState(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <div className="md:col-span-4">
        <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">City / Hotel / Area</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          <input list="city-list" placeholder="Where to stay?" value={city}
            onChange={e=>setCity(e.target.value)} className="input-field pl-10 font-medium" />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">Check-in</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          <input type="date" value={checkIn} onChange={e=>setIn(e.target.value)} className="input-field pl-10" />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">Check-out</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          <input type="date" value={checkOut} onChange={e=>setOut(e.target.value)} className="input-field pl-10" />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">Rooms · Guests</label>
        <div className="flex gap-2">
          <select value={rooms} onChange={e=>setRooms(e.target.value)}
            className="input-field text-sm px-3 flex-1">
            {[1,2,3,4].map(n=><option key={n}>{n} Room{n>1?"s":""}</option>)}
          </select>
        </div>
      </div>
      <div className="md:col-span-2 flex items-end">
        <button onClick={() => onSearch({ city,checkIn,checkOut,rooms,guests })}
          className="btn-primary w-full py-3 rounded-xl text-sm font-bold">
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
      <datalist id="city-list">
        {INDIAN_CITIES.map(c=><option key={c} value={c} />)}
      </datalist>
    </div>
  );
}

function GenericSearch({ tab, onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo]     = useState("");
  const [date, setDate] = useState("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <div className="md:col-span-4">
        <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">From</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input list="city-list" placeholder="Origin" value={from} onChange={e=>setFrom(e.target.value)} className="input-field pl-10" />
        </div>
      </div>
      <div className="md:col-span-4">
        <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">To</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
          <input list="city-list" placeholder="Destination" value={to} onChange={e=>setTo(e.target.value)} className="input-field pl-10" />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 px-1">Date</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input-field pl-10" />
        </div>
      </div>
      <div className="md:col-span-2 flex items-end">
        <button onClick={() => onSearch({ from,to,date })} className="btn-primary w-full py-3 rounded-xl text-sm font-bold">
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
      <datalist id="city-list">
        {INDIAN_CITIES.map(c=><option key={c} value={c} />)}
      </datalist>
    </div>
  );
}

/* ── Floating destination card ─────────────────────────────── */
function FloatingCard({ img, city, price, delay, className }) {
  return (
    <div
      className={`absolute glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="relative">
        <img src={img} alt={city} className="w-full h-24 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <p className="text-white text-xs font-bold leading-tight">{city}</p>
          <p className="text-primary-300 text-[10px]">from {price}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main HeroSection ──────────────────────────────────────── */
export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("flights");
  const [slide, setSlide]         = useState(0);
  const [fading, setFading]       = useState(false);
  const navigate                  = useNavigate();
  const timerRef                  = useRef(null);

  /* auto-slide every 5 s */
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, [slide]);

  const nextSlide = () => {
    setFading(true);
    setTimeout(() => {
      setSlide(s => (s + 1) % BG_SLIDES.length);
      setFading(false);
    }, 700);
  };

  const goSlide = (i) => {
    if (i === slide) return;
    setFading(true);
    setTimeout(() => { setSlide(i); setFading(false); }, 700);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 5000);
  };

  const handleSearch = (data) => {
    if (activeTab === "flights") navigate(`/flights?from=${data.from}&to=${data.to}&date=${data.depart}`);
    if (activeTab === "hotels")  navigate(`/hotels?city=${data.city}&checkIn=${data.checkIn}&checkOut=${data.checkOut}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background with parallax feel ─────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay always present */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-dark-900/60 via-dark-900/30 to-dark-900" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/40" />

        {/* Slide images */}
        {BG_SLIDES.map((s, i) => (
          <img key={i} src={s.url} alt={s.location}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms]"
            style={{
              opacity: i === slide ? (fading ? 0 : 1) : 0,
              transform: i === slide ? "scale(1.05)" : "scale(1)",
              transition: "opacity 1.2s ease, transform 6s ease",
            }}
          />
        ))}
      </div>

      {/* ── Ambient blobs ─────────────────────────────────── */}
      <div className="absolute top-1/4 left-[5%] w-[500px] h-[500px] bg-primary-500/15 rounded-full blur-[120px] animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse z-0" style={{animationDelay:"2s"}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] z-0" />

      {/* ── Floating cards (decorative) ────────────────────── */}
      <FloatingCard
        img="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=70"
        city="Swiss Alps" price="₹52,000"
        delay="0s"
        className="w-40 float-card hidden xl:block top-[22%] right-[6%] z-10"
      />
      <FloatingCard
        img="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=300&q=70"
        city="Maldives" price="₹38,000"
        delay="1.5s"
        className="w-36 float-card-delayed hidden xl:block top-[48%] right-[12%] z-10"
      />
      <FloatingCard
        img="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&q=70"
        city="Goa" price="₹8,999"
        delay="3s"
        className="w-36 float-card-slow hidden xl:block top-[30%] left-[4%] z-10"
      />

      {/* ── Main content ──────────────────────────────────── */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">

          {/* Location pill */}
          <div className="flex items-center justify-center mb-5 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 text-sm border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-white/80">{BG_SLIDES[slide].location}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 text-xs">{BG_SLIDES[slide].country}</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-10">
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-5 animate-fade-up tracking-tight">
              Explore The World
              <br />
              <span className="gradient-text text-glow-orange">Without Limits</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto animate-fade-up leading-relaxed" style={{animationDelay:"0.15s"}}>
              Discover extraordinary destinations, premium stays, and unforgettable journeys —
              powered by AI, crafted for travelers.
            </p>
          </div>

          {/* ── Search Card ──────────────────────────────── */}
          <div className="glass rounded-3xl p-5 md:p-7 shadow-2xl border border-white/10 animate-fade-up max-w-5xl mx-auto"
            style={{animationDelay:"0.25s"}}>

            {/* Tab strips */}
            <div className="flex gap-1 mb-6 overflow-x-auto hide-scrollbar pb-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    activeTab === id
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                      : "text-slate-400 hover:text-white hover:bg-dark-700/80"
                  }`}>
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}

              {/* Diya AI quick-tip */}
              <div className="ml-auto flex-shrink-0 flex items-center">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 transition-all border border-purple-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Plan with AI
                </button>
              </div>
            </div>

            {/* Search form */}
            {activeTab === "flights"  && <FlightSearch onSearch={handleSearch} />}
            {activeTab === "hotels"   && <HotelSearch  onSearch={handleSearch} />}
            {(activeTab === "buses" || activeTab === "trains" || activeTab === "holidays") &&
              <GenericSearch tab={activeTab} onSearch={handleSearch} />}
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-8 animate-fade-in" style={{animationDelay:"0.4s"}}>
            {BG_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === slide ? "w-8 h-2 bg-primary-400" : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-10 animate-fade-up" style={{animationDelay:"0.5s"}}>
            {[["10M+","Travelers served"],["500K+","Hotels listed"],["200+","Destinations"]].map(([n,l])=>(
              <div key={l} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold gradient-text">{n}</div>
                <div className="text-slate-500 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trusted by strip ──────────────────────────────── */}
      <div className="relative z-20 border-t border-white/5 glass-dark py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto hide-scrollbar">
          <span className="text-xs text-slate-500 uppercase tracking-widest whitespace-nowrap flex-shrink-0">Trusted by</span>
          {["IRCTC","Air India","MakeMyTrip","Airbnb","Thomas Cook","Kesari","Club Mahindra"].map(b=>(
            <span key={b} className="text-slate-400 text-sm font-semibold opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap flex-shrink-0">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}