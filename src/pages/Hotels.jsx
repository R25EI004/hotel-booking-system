import { useState } from "react";
import HotelCard from "../components/HotelCard";

const sampleHotels = [
  {
    id: 1,
    name: "Grand Comfort Hotel",
    location: "Bengaluru",
    description: "A comfortable hotel with modern rooms and amenities.",
    rating: 4.5,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 2,
    name: "City View Residency",
    location: "Bengaluru",
    description: "Enjoy a relaxing stay close to popular city attractions.",
    rating: 4.2,
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
  },
  {
    id: 3,
    name: "Royal Garden Hotel",
    location: "Chennai",
    description: "A stylish hotel for family holidays and business trips.",
    rating: 4.7,
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    id: 4,
    name: "Ocean Breeze Hotel",
    location: "Goa",
    description: "Relax near the coast and enjoy a peaceful getaway.",
    rating: 4.8,
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  },
];

export default function Hotels() {
  const [search, setSearch] = useState("");

  const filteredHotels = sampleHotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section">
      <h1>Explore Hotels</h1>
      <p>Find your next stay from our sample hotel collection.</p>

      <input
        className="hotel-search"
        type="text"
        placeholder="Search by hotel name or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredHotels.length === 0 ? (
        <p>No hotels found. Try another search.</p>
      ) : (
        <div className="hotel-grid">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}