import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [error, setError] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setError("");

    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError("Please select valid check-in and check-out dates.");
      return;
    }

    if (guests < 1) {
      setError("At least one guest is required.");
      return;
    }

    navigate("/hotels");
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO STAYEASE</p>

          <h1>Find Your Perfect Stay</h1>

          <p>
            Discover beautiful hotels and plan your next memorable trip.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <div>
              <label>Destination</label>
              <input
                type="text"
                placeholder="Enter city"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div>
              <label>Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Check-out</label>
              <input
                type="date"
                min={checkIn || undefined}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Guests</label>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>

            <button type="submit" className="primary-button">
              Search Hotels
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </section>

      <section className="section">
        <h2>Why Choose StayEase?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>🏨</span>
            <h3>Comfortable Hotels</h3>
            <p>Explore stays for your next trip.</p>
          </div>

          <div className="feature-card">
            <span>📅</span>
            <h3>Easy Booking</h3>
            <p>Choose dates and plan your stay.</p>
          </div>

          <div className="feature-card">
            <span>✨</span>
            <h3>Great Experiences</h3>
            <p>Find a place that feels right for you.</p>
          </div>
        </div>
      </section>
    </>
  );
}