import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const hotels = [
  {
    id: 1,
    name: "Grand Comfort Hotel",
    location: "Bengaluru",
    price: 2500,
  },
  {
    id: 2,
    name: "City View Residency",
    location: "Bengaluru",
    price: 1800,
  },
  {
    id: 3,
    name: "Royal Garden Hotel",
    location: "Chennai",
    price: 3200,
  },
  {
    id: 4,
    name: "Ocean Breeze Hotel",
    location: "Goa",
    price: 4000,
  },
];

export default function Booking() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find((item) => item.id === Number(hotelId));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");

  if (!hotel) {
    return (
      <section className="section">
        <h1>Hotel Not Found</h1>
        <Link to="/hotels">Back to Hotels</Link>
      </section>
    );
  }

  function handleBooking(e) {
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

    const booking = {
      id: Date.now(),
      hotelName: hotel.name,
      location: hotel.location,
      price: hotel.price,
      name,
      email,
      checkIn,
      checkOut,
      guests,
      status: "Confirmed (Demo)",
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("hotelBookings") || "[]"
    );

    localStorage.setItem(
      "hotelBookings",
      JSON.stringify([...existingBookings, booking])
    );

    navigate("/history");
  }

  return (
    <section className="section">
      <div className="booking-form">
        <h1>Book Your Stay</h1>

        <h3>{hotel.name}</h3>
        <p>📍 {hotel.location}</p>
        <h3>₹{hotel.price} / night</h3>

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

          <button type="submit" className="primary-button full-width">
            Confirm Demo Booking
          </button>
        </form>
      </div>
    </section>
  );
}