import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear demo login status
    localStorage.removeItem("isLoggedIn");

    alert("Logged out successfully!");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
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
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}