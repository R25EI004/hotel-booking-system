import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const isLoggedIn = Boolean(user) || localStorage.getItem("isLoggedIn") === "true";

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        StayEase
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/history">Booking History</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="nav-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}