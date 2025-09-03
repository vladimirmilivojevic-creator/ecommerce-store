import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-link">Shop</Link>
        {user && <Link to="/orders" className="nav-link">My Orders</Link>}
        {user && <Link to="/profile" className="nav-link">Profile</Link>}
      </div>
      {user ? (
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      ) : (
        <Link to="/auth" className="nav-link">Login/Register</Link>
      )}
    </nav>
  );
}

export default Navbar;
