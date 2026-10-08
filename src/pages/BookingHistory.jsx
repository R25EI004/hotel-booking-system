import { Link } from "react-router-dom";

export default function BookingHistory() {
  const bookings = JSON.parse(
    localStorage.getItem("hotelBookings") || "[]"
  );

  function cancelBooking(id) {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== id
    );

    localStorage.setItem(
      "hotelBookings",
      JSON.stringify(updatedBookings)
    );

    window.location.reload();
  }

  return (
    <section className="section">
      <h1>My Bookings</h1>
      <p>View the bookings saved in this browser.</p>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Explore our hotels and make a demo booking.</p>

          <Link to="/hotels" className="primary-button">
            Explore Hotels
          </Link>
        </div>
      ) : (
        <div className="booking-history-grid">
          {bookings.map((booking) => (
            <div className="history-card" key={booking.id}>
              <h3>{booking.hotelName}</h3>
              <p>📍 {booking.location}</p>
              <p>Guest: {booking.name}</p>
              <p>Check-in: {booking.checkIn}</p>
              <p>Check-out: {booking.checkOut}</p>
              <p>Guests: {booking.guests}</p>
              <p>Price per night: ₹{booking.price}</p>

              <span className="status status-confirmed">
                {booking.status}
              </span>

              <button
                className="secondary-button"
                onClick={() => cancelBooking(booking.id)}
              >
                Remove Demo Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}