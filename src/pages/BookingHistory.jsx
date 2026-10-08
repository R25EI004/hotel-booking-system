import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function BookingHistory({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  async function fetchBookings() {
    setLoading(true);
    try {
      let supabaseBookings = [];

      if (user) {
        // Fetch bookings for the logged-in user
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_email", user.email)
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          supabaseBookings = data.map((b) => ({
            id: b.id,
            hotelName: b.hotel_name,
            location: b.location,
            price: b.price,
            name: b.user_name,
            email: b.user_email,
            checkIn: b.check_in,
            checkOut: b.check_out,
            guests: b.guests,
            status: b.status || "Confirmed",
          }));
        }
      }

      // Merge with localStorage (for bookings made when not logged in)
      const local = JSON.parse(localStorage.getItem("hotelBookings") || "[]");

      // Deduplicate by id
      const allIds = new Set(supabaseBookings.map((b) => String(b.id)));
      const mergedLocal = local.filter((b) => !allIds.has(String(b.id)));

      setBookings([...supabaseBookings, ...mergedLocal]);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      const local = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
      setBookings(local);
    } finally {
      setLoading(false);
    }
  }

  async function cancelBooking(id) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      // Try to delete from Supabase
      await supabase.from("bookings").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete skipped:", err.message);
    }

    // Always update local state and localStorage
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);

    const local = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
    localStorage.setItem(
      "hotelBookings",
      JSON.stringify(local.filter((b) => b.id !== id))
    );
  }

  return (
    <section className="section">
      <h1>My Bookings</h1>
      <p>View the bookings linked to your account.</p>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Explore our hotels and make a booking.</p>
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
              <p>Email: {booking.email}</p>
              <p>Check-in: {booking.checkIn}</p>
              <p>Check-out: {booking.checkOut}</p>
              <p>Guests: {booking.guests}</p>
              <p>Price per night: ₹{Number(booking.price).toLocaleString()}</p>

              <span className="status status-confirmed">
                {booking.status}
              </span>

              <button
                className="secondary-button"
                onClick={() => cancelBooking(booking.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}