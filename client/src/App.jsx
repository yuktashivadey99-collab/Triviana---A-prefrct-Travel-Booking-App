import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./store/slices/authSlice";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Flights from "./pages/Flights";
import Holidays from "./pages/Holidays";
import Bus from "./pages/Bus";
import Trains from "./pages/Trains";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) dispatch(getMe());
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155" },
        success: { iconTheme: { primary: "#f97316", secondary: "#fff" } },
      }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/booking/:id" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}