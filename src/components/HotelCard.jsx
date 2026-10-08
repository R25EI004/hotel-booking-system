import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} />

      <div className="hotel-card-content">
        <h3>{hotel.name}</h3>
        <p>📍 {hotel.location}</p>
        {hotel.description && <p>{hotel.description}</p>}
        <p>⭐ {hotel.rating || 4.5}</p>
        <h3>₹{Number(hotel.price).toLocaleString()} / night</h3>

        <Link to={`/booking/${hotel.id}`} className="primary-button">
          Book Now
        </Link>
      </div>
    </div>
  );
}