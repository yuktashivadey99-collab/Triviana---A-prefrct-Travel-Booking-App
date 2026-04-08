import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import {
  Menu, X, Globe, User, LogOut, LayoutDashboard,
  ChevronDown, Plane, Hotel, Package, Bus, Train,
  Sparkles, Phone, Bell
} from "lucide-react";
import toast from "react-hot-toast";

const services = [
  { id: "flights",  label: "Flights",  icon: Plane,    to: "/flights",  color: "text-blue-400" },
  { id: "hotels",   label: "Hotels",   icon: Hotel,    to: "/hotels",   color: "text-emerald-400" },
  { id: "holidays", label: "Holidays", icon: Package,  to: "/holidays", color: "text-purple-400" },
  { id: "bus",      label: "Bus",      icon: Bus,      to: "/bus",      color: "text-yellow-400" },
  { id: "trains",   label: "Trains",   icon: Train,    to: "/trains",   color: "text-cyan-400" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropOpen, setDropOpen]       = useState(false);
  const [activeService, setActive]    = useState(null);
  const dropRef                       = useRef(null);
  const { user }                      = useSelector((s) => s.auth);
  const dispatch                      = useDispatch();
  const navigate                      = useNavigate();
  const location                      = useLocation();
  const isHome                        = location.pathname === "/";

  /* scroll effect */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close dropdown when clicking outside */
  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* set active service from path */
  useEffect(() => {
    const svc = services.find((s) => location.pathname.startsWith(s.to));
    setActive(svc?.id ?? null);
  }, [location]);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
    setDropOpen(false);
  };

  const taglines = ["Flights • Hotels • Holidays", "Discover Unseen Paths", "Journey Beyond Borders", "Travel The World"];
  const [taglineIndex, setTaglineIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navBg = scrolled || !isHome
    ? "bg-dark-900/95 backdrop-blur-xl border-b border-dark-700/80 shadow-2xl"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      {/* Top strip – offers */}
      {!scrolled && isHome && (
        <div className="hidden md:block bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 py-1 text-center text-xs font-medium text-white/90 animate-fade-in">
          ✈️ Summer Sale: Up to 40% off on select flights &amp; hotels &nbsp;|&nbsp; 🌴 Use code <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded-md">TRIVIANA40</span> &nbsp;|&nbsp; 📞 24×7 support: 1800-890-3456
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top Row ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between h-16">

          {/* Logo & Name */}
          <Link to="/" className="flex items-start gap-3 group flex-shrink-0 mt-2">
            <div className="relative mt-1">
              <img src="https://ui-avatars.com/api/?name=TR&background=f97316&color=fff&rounded=true&bold=true" alt="Triviana Logo" className="w-10 h-10 rounded-xl shadow-lg shadow-primary-500/40 group-hover:scale-110 transition-transform duration-300 object-cover" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-dark-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl text-white tracking-tight leading-none mb-1">
                Trivi<span className="gradient-text">ana</span>
              </span>
              <div className="h-4 overflow-hidden relative w-48">
                {taglines.map((text, i) => (
                  <span
                    key={text}
                    className={`absolute left-0 top-0 text-[10px] text-primary-400 tracking-widest uppercase font-semibold transition-all duration-500 ${
                      i === taglineIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Services – horizontal pill group (desktop) */}
          <div className="hidden lg:flex items-center gap-0.5 bg-dark-800/60 rounded-2xl p-1 border border-dark-700/60 backdrop-blur-sm">
            {services.map(({ id, label, icon: Icon, to, color }) => (
              <Link
                key={id} to={to}
                onClick={() => setActive(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeService === id
                    ? "bg-dark-700 text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-dark-700/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${activeService === id ? color : "inherit"}`} />
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Diya AI pill */}
            <Link
              to="/ai-assistant"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full ai-glow glass-light text-sm font-medium text-purple-300 hover:text-white transition-colors border border-purple-500/30 hover:border-purple-400/60 group"
            >
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>Diya AI</span>
            </Link>

            {user ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2 bg-dark-700/80 hover:bg-dark-600 px-3 py-2 rounded-xl transition-all border border-dark-600/60"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-orange-600 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-primary-500/30">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-white font-medium">{user.name?.split(" ")[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
                </button>

                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 glass-dark rounded-2xl shadow-2xl overflow-hidden border border-dark-600/60 animate-fade-up">
                    <div className="p-3 border-b border-dark-600/60">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link to="/dashboard" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-dark-700 hover:text-white transition-all">
                        <LayoutDashboard className="w-4 h-4" /> My Bookings
                      </Link>
                      <Link to="/profile" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-dark-700 hover:text-white transition-all">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth" className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-dark-700 transition-all">
                  Log in
                </Link>
                <Link to="/auth?mode=register" className="btn-primary text-sm py-2 px-5 rounded-xl">
                  Sign up free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-dark-700 transition-all">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-dark-700/60 animate-fade-in">
          <div className="p-4 space-y-1">
            {services.map(({ id, label, icon: Icon, to, color }) => (
              <Link key={id} to={to} onClick={() => { setMenuOpen(false); setActive(id); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeService === id ? "bg-dark-700 text-white" : "text-slate-300 hover:bg-dark-700/60 hover:text-white"
                }`}>
                <Icon className={`w-4 h-4 ${color}`} /> {label}
              </Link>
            ))}

            <Link to="/ai-assistant" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-purple-300 hover:bg-purple-500/10 transition-all">
              <Sparkles className="w-4 h-4 text-purple-400" /> Diya AI Assistant
            </Link>

            <div className="border-t border-dark-700/60 pt-3 mt-2 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="btn-outline w-full justify-center text-sm py-2.5">My Bookings</Link>
                  <button onClick={handleLogout} className="w-full text-red-400 py-2 text-sm hover:text-red-300 transition-colors">Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMenuOpen(false)} className="btn-outline w-full justify-center text-sm py-2.5">Log in</Link>
                  <Link to="/auth?mode=register" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center text-sm py-2.5">Sign up free</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}