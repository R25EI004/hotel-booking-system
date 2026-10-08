import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel/:hotelId" element={<HotelDetails />} />
          <Route path="/booking/:hotelId" element={<Booking user={user} />} />
          <Route path="/history" element={<BookingHistory user={user} />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/signup" element={<Signup user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="footer">
          <p>© 2026 StayEase. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;