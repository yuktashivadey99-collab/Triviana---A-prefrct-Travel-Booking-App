/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa",
          300: "#fdba74", 400: "#fb923c", 500: "#f97316",
          600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12",
        },
        dark: {
          950: "#020617", 900: "#0f172a", 800: "#1e293b",
          700: "#334155", 600: "#475569", 500: "#64748b",
        },
        gold: {
          400: "#facc15", 500: "#eab308", 600: "#ca8a04",
        },
        teal: {
          400: "#2dd4bf", 500: "#14b8a6",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-left": "slideLeft 0.5s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        shimmer: "shimmer 1.8s infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "card-hover": "cardHover 0.3s ease forwards",
        "bg-pan": "bgPan 20s ease infinite alternate",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: 0, transform: "translateY(40px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideLeft: { "0%": { opacity: 0, transform: "translateX(40px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        slideRight: { "0%": { opacity: 0, transform: "translateX(-40px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-18px)" } },
        pulseGlow: { "0%,100%": { boxShadow: "0 0 20px rgba(249,115,22,0.3)" }, "50%": { boxShadow: "0 0 45px rgba(249,115,22,0.7)" } },
        bounceSoft: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
        bgPan: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "100% 50%" } },
      },
      backdropBlur: { xs: "2px" },
      boxShadow: {
        "glow-orange": "0 0 30px rgba(249,115,22,0.4)",
        "glow-blue": "0 0 30px rgba(59,130,246,0.4)",
        "card-3d": "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.1)",
        glass: "0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
      },
      perspective: { "1000": "1000px", "2000": "2000px" },
      transformStyle: { "preserve-3d": "preserve-3d" },
    },
  },
  plugins: [],
};