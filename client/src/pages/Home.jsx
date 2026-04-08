import HeroSection from "../components/home/HeroSection";
import SeasonalDeals from "../components/home/SeasonalDeals";
import DomesticFlights from "../components/home/DomesticFlights";
import InternationalFlights from "../components/home/InternationalFlights";
import TrendingHolidays from "../components/home/TrendingHolidays";
import FeaturedHotels from "../components/home/FeaturedHotels";
import Destinations from "../components/home/Destinations";
import WhyUs from "../components/home/WhyUs";
import DiyaAI from "../components/home/DiyaAI";

export default function Home() {
  return (
    <main className="bg-dark-950 font-body text-slate-300">
      <HeroSection />
      
      {/* Flight sections */}
      <DomesticFlights />
      <InternationalFlights />
      
      {/* Deals & Packages */}
      <SeasonalDeals />
      <TrendingHolidays />
      
      {/* Hotels & Destinations */}
      <FeaturedHotels />
      <Destinations />
      
      {/* Brand & AI */}
      <WhyUs />
      <DiyaAI />
    </main>
  );
}