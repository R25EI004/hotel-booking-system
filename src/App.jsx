import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:hotelId" element={<HotelDetails />} />
        <Route path="/booking/:hotelId" element={<Booking />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>

      <footer className="footer">
        <p>© 2026 StayEase | Hotel Booking System</p>
      </footer>
    </BrowserRouter>
  );
}