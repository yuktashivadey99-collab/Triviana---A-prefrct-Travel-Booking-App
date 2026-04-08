import { Shield, Clock, HeadphonesIcon, BadgePercent, Star, Globe, Lock, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Shield, title: "100% Secure Payments",
    desc: "End-to-end encryption with PCI-DSS compliance. Your card details are never stored.",
    gradient: "from-emerald-500/20 to-teal-500/10", iconColor:"text-emerald-400", border:"hover:border-emerald-500/40"
  },
  {
    icon: Zap, title: "Instant Confirmation",
    desc: "Real-time booking confirmation in under 3 seconds. No waiting, no uncertainty.",
    gradient: "from-yellow-500/20 to-orange-500/10", iconColor:"text-yellow-400", border:"hover:border-yellow-500/40"
  },
  {
    icon: HeadphonesIcon, title: "24×7 Expert Support",
    desc: "Our travel experts are available round the clock — call, chat, or email.",
    gradient: "from-blue-500/20 to-cyan-500/10", iconColor:"text-blue-400", border:"hover:border-blue-500/40"
  },
  {
    icon: BadgePercent, title: "Best Price Guarantee",
    desc: "Find a lower price anywhere? We'll match it — plus give you an extra 5% off.",
    gradient: "from-primary-500/20 to-orange-500/10", iconColor:"text-primary-400", border:"hover:border-primary-500/40"
  },
  {
    icon: Star, title: "Verified Reviews Only",
    desc: "Every review comes from a real, verified traveler. Zero fake ratings, ever.",
    gradient: "from-purple-500/20 to-pink-500/10", iconColor:"text-purple-400", border:"hover:border-purple-500/40"
  },
  {
    icon: Globe, title: "500+ Destinations",
    desc: "Explore handpicked destinations across India and 70+ countries worldwide.",
    gradient: "from-cyan-500/20 to-teal-500/10", iconColor:"text-cyan-400", border:"hover:border-cyan-500/40"
  },
];

const TRUST_STATS = [
  { value: "10M+", label: "Happy Travelers", icon: "😊" },
  { value: "₹2,100 Cr", label: "Bookings Processed", icon: "💰" },
  { value: "4.8★", label: "App Store Rating", icon: "⭐" },
  { value: "99.7%", label: "Booking Success Rate", icon: "✅" },
];

export default function WhyUs() {
  return (
    <section className="section-pad bg-dark-900 relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/3 rounded-full blur-[160px]" />
      </div>

      <div className="section-container relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge-orange mb-4 inline-flex">
            <Lock className="w-3.5 h-3.5" /> Why Triviana
          </div>
          <h2 className="section-title">
            Travel with <span className="gradient-text">Complete Confidence</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            We've built the most trusted travel platform in India — here's why 10 million travelers choose us.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {FEATURES.map(({ icon: Icon, title, desc, gradient, iconColor, border }) => (
            <div key={title}
              className={`card p-6 group hover:-translate-y-2 transition-all duration-300 ${border} relative overflow-hidden`}>
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-dark-700 group-hover:bg-dark-600 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-white transition-colors">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="glass rounded-3xl p-8 border border-white/8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_STATS.map(({ value, label, icon }) => (
              <div key={label} className="text-center group">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="font-display font-bold text-2xl md:text-3xl gradient-text mb-1">{value}</div>
                <div className="text-slate-400 text-xs tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 glass rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&q=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="user"
                  className="w-10 h-10 rounded-full border-2 border-dark-800 object-cover" />
              ))}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Join 10M+ happy travelers</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                <span className="text-slate-400 text-xs ml-1">4.8/5 across 2M+ reviews</span>
              </div>
            </div>
          </div>
          <button className="btn-primary px-6 py-2.5 rounded-xl text-sm">
            Start Exploring Free
          </button>
        </div>
      </div>
    </section>
  );
}