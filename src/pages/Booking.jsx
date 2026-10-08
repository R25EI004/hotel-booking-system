import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const fallbackHotels = [
  { id: 1, name: "Grand Comfort Hotel", location: "Bengaluru", price: 2500 },
  { id: 2, name: "City View Residency", location: "Bengaluru", price: 1800 },
  { id: 3, name: "Royal Garden Hotel", location: "Chennai", price: 3200 },
  { id: 4, name: "Ocean Breeze Hotel", location: "Goa", price: 4000 },
];

export default function Booking({ user }) {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill user details if logged in
  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Fetch hotel from Supabase, fallback to static data
  useEffect(() => {
    async function fetchHotel() {
      try {
        const { data, err } = await supabase
          .from("hotels")
          .select("*")
          .eq("id", hotelId)
          .single();

        if (err || !data) {
          setHotel(fallbackHotels.find((h) => h.id === Number(hotelId)) || null);
        } else {
          setHotel(data);
        }
      } catch {
        setHotel(fallbackHotels.find((h) => h.id === Number(hotelId)) || null);
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return (
      <section className="section">
        <p>Loading hotel information...</p>
      </section>
    );
  }

  if (!hotel) {
    return (
      <section className="section">
        <h1>Hotel Not Found</h1>
        <Link to="/hotels">Back to Hotels</Link>
      </section>
    );
  }

  const nights =
    checkIn && checkOut && checkOut > checkIn
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        )
      : 1;

  async function handleBooking(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError("Please select valid booking dates.");
      return;
    }

    if (guests < 1) {
      setError("At least one guest is required.");
      return;
    }

    setSubmitting(true);

    try {
      // Try to save to Supabase
      const { data: inserted, error: dbError } = await supabase
        .from("bookings")
        .insert([
          {
            hotel_id: Number(hotel.id),
            hotel_name: hotel.name,
            location: hotel.location,
            price: Number(hotel.price),
            user_name: name.trim(),
            user_email: email.trim(),
            check_in: checkIn,
            check_out: checkOut,
            guests: Number(guests),
            status: "Confirmed",
            user_id: user?.id || null,
          },
        ])
        .select()
        .single();

      if (dbError) {
        console.warn("Supabase insert error:", dbError.message);
      }

      // Always save to localStorage as local backup
      const localBooking = {
        id: inserted?.id || Date.now(),
        hotelName: hotel.name,
        location: hotel.location,
        price: hotel.price,
        name: name.trim(),
        email: email.trim(),
        checkIn,
        checkOut,
        guests,
        status: "Confirmed",
      };

      const existing = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
      localStorage.setItem(
        "hotelBookings",
        JSON.stringify([...existing, localBooking])
      );

      navigate("/history");
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="booking-form">
        <h1>Book Your Stay</h1>

        <h3>{hotel.name}</h3>
        <p>📍 {hotel.location}</p>
        <h3>₹{Number(hotel.price).toLocaleString()} / night</h3>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleBooking}>
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Check-in Date</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />

          <label>Check-out Date</label>
          <input
            type="date"
            min={checkIn || undefined}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />

          <label>Number of Guests</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
          />

          {checkIn && checkOut && checkOut > checkIn && (
            <p>
              <strong>
                {nights} night(s) × ₹{Number(hotel.price).toLocaleString()} ={" "}
                ₹{(nights * Number(hotel.price)).toLocaleString()} total
              </strong>
            </p>
          )}

          <button
            type="submit"
            className="primary-button full-width"
            disabled={submitting}
          >
            {submitting ? "Confirming..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}