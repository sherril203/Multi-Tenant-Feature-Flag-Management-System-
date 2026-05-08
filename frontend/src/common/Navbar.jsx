import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3">

      <div className="text-xl font-bold">
        Tenant App
      </div>

      <div className="flex gap-6">

        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>

        {role === "SUPER_ADMIN" && (
          <>
            <Link to="/create-org">Create Org</Link>
            <Link to="/orgs">Organizations</Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/features">Features</Link>
            <Link to="/create-feature">Add Feature</Link>
          </>
        )}

        {role === "USER" && (
          <>
            <Link to="/features">Features</Link>
          </>
        )}
      </div>

      <div className="flex gap-4 items-center">

        {!role ? (
          <>
            <Link to="/signup" className="border rounded p-3">Signup</Link>
            <Link to="/login" className="border rounded p-3">Login</Link>
          </>
        ) : (
          <>
            <span className="text-sm">Hi, {name || role}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;