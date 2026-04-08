import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const TwitterIcon = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const InstagramIcon = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);

const YoutubeIcon = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0.0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

const FacebookIcon = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
);

const LinkedinIcon = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
);

const NAV = {
  Explore: [
    { label:"Hotels",    to:"/hotels" },
    { label:"Flights",   to:"/flights" },
    { label:"Holidays",  to:"/holidays" },
    { label:"Bus",       to:"/bus" },
    { label:"Trains",    to:"/trains" },
    { label:"Cabs",      to:"/cabs" },
  ],
  Company: [
    { label:"About Us",       to:"/about" },
    { label:"Careers",        to:"/careers" },
    { label:"Press",          to:"/press" },
    { label:"Blog",           to:"/blog" },
    { label:"Affiliate",      to:"/affiliate" },
    { label:"Investor",       to:"/investor" },
  ],
  Support: [
    { label:"Help Center",    to:"/help" },
    { label:"Cancel Booking", to:"/cancel" },
    { label:"Refund Status",  to:"/refunds" },
    { label:"Privacy Policy", to:"/privacy" },
    { label:"Terms of Use",   to:"/terms" },
    { label:"Cookie Policy",  to:"/cookies" },
  ],
};

const SOCIALS = [
  { Icon: TwitterIcon,   href:"#", label:"Twitter" },
  { Icon: InstagramIcon, href:"#", label:"Instagram" },
  { Icon: FacebookIcon,  href:"#", label:"Facebook" },
  { Icon: YoutubeIcon,   href:"#", label:"YouTube" },
  { Icon: LinkedinIcon,  href:"#", label:"LinkedIn" },
];

const PAYMENTS = ["Visa","Mastercard","UPI","Paytm","Net Banking","EMI"];

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-700/60 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Newsletter strip */}
      <div className="border-b border-dark-700/60 py-8">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-display font-bold text-white text-xl">Get exclusive travel deals</h3>
            <p className="text-slate-400 text-sm mt-0.5">Join 500K+ subscribers. Unsubscribe anytime.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="Enter your email"
              className="input-field max-w-xs flex-1 md:flex-none md:w-64 text-sm" />
            <button className="btn-primary py-2.5 px-5 text-sm rounded-xl flex-shrink-0">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-xl text-white">
                  Trivi<span className="gradient-text">ana</span>
                </span>
                <span className="text-[9px] text-slate-500 tracking-widest uppercase">Travel · Explore · Discover</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's most trusted travel platform. Discover the world with confidence — expert guidance, best prices, 24×7 support.
            </p>

            {/* Socials */}
            <div className="flex gap-2 mb-6">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 bg-dark-700 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all group border border-dark-600 hover:border-primary-500">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2">
              {[
                { Icon: Mail,    text:"support@triviana.com" },
                { Icon: Phone,   text:"1800-890-3456 (Toll Free)" },
                { Icon: MapPin,  text:"Mumbai, India — 400 001" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <Icon className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      className="text-slate-400 hover:text-primary-400 text-sm transition-colors hover:pl-1 duration-200 block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-700/60 py-5">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Triviana Travel Pvt. Ltd. All rights reserved.
          </p>

          {/* Payment badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-slate-600 text-xs">Accepted payments:</span>
            {PAYMENTS.map(p => (
              <span key={p} className="text-[10px] bg-dark-700 text-slate-400 px-2 py-0.5 rounded-md border border-dark-600">
                {p}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-500 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
            <span className="text-slate-600 text-xs">🇮🇳 Made with ♥ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}