import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import HotelCard from "../components/HotelCard";

const fallbackHotels = [
  {
    id: 1,
    name: "Grand Comfort Hotel",
    location: "Bengaluru",
    description: "A comfortable hotel with modern rooms and amenities.",
    rating: 4.5,
    price: 2500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 2,
    name: "City View Residency",
    location: "Bengaluru",
    description: "Enjoy a relaxing stay close to popular city attractions.",
    rating: 4.2,
    price: 1800,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
  },
  {
    id: 3,
    name: "Royal Garden Hotel",
    location: "Chennai",
    description: "A stylish hotel for family holidays and business trips.",
    rating: 4.7,
    price: 3200,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    id: 4,
    name: "Ocean Breeze Hotel",
    location: "Goa",
    description: "Relax near the coast and enjoy a peaceful getaway.",
    rating: 4.8,
    price: 4000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");

  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data, error: dbErr } = await supabase
          .from("hotels")
          .select("*")
          .limit(3);
        if (dbErr || !data || data.length === 0) {
          setFeaturedHotels(fallbackHotels.slice(0, 3));
        } else {
          setFeaturedHotels(data);
        }
      } catch {
        setFeaturedHotels(fallbackHotels.slice(0, 3));
      } finally {
        setLoadingHotels(false);
      }
    }
    fetchFeatured();
  }, []);

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

    navigate(`/hotels?search=${encodeURIComponent(destination.trim())}`);
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO STAYEASE</p>
          <h1>Find Your Perfect Stay</h1>
          <p>Discover beautiful hotels and plan your next memorable trip.</p>

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

      {/* FEATURED HOTELS */}
      <section className="section">
        <h2>Popular Hotels</h2>
        <p>Find your next stay from our top picks.</p>

        {loadingHotels ? (
          <p>Loading hotels...</p>
        ) : (
          <div className="hotel-grid">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>

      {/* FEATURES */}
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