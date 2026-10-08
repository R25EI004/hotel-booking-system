import { Link, useParams } from "react-router-dom";

const hotels = [
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

export default function HotelDetails() {
  const { hotelId } = useParams();

  const hotel = hotels.find((item) => item.id === Number(hotelId));

  if (!hotel) {
    return (
      <section className="section">
        <h1>Hotel Not Found</h1>
        <Link to="/hotels" className="primary-button">
          Back to Hotels
        </Link>
      </section>
    );
  }

  return (
    <section className="section details-layout">
      <img src={hotel.image} alt={hotel.name} />

      <div>
        <h1>{hotel.name}</h1>
        <p>📍 {hotel.location}</p>
        <p>⭐ {hotel.rating}</p>
        <p>{hotel.description}</p>
        <h2>₹{hotel.price} / night</h2>

        <Link to={`/booking/${hotel.id}`} className="primary-button">
          Book This Hotel
        </Link>
      </div>
    </section>
  );
}