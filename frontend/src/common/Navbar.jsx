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

      {/* LEFT */}
      <div className="text-xl font-bold">
        Tenant App
      </div>

      {/* CENTER */}
      <div className="flex gap-6">

        {/* Dynamic Home */}
        <Link to={
          role === "SUPER_ADMIN" ? "/superadmin" :
          role === "ADMIN" ? "/admin" :
          role === "USER" ? "/user" : "/"
        }>
          Home
        </Link>

     

        {role === "SUPER_ADMIN" && (
          <>
            <Link to="/superadmin/create-org">Create Org</Link>
            <Link to="/superadmin/orgs">Organizations</Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/admin/features">Features</Link>
            <Link to="/admin/create-feature">Add Feature</Link>
          </>
        )}

        {role === "USER" && (
          <>
            <Link to="/user/features">Features</Link>
          </>
        )}
           <Link to={role === "USER" ? "/user" : "/"}>Contact</Link>
      </div>

      {/* RIGHT */}
      <div className="flex gap-4 items-center">

        {!role ? (
          <>
            <Link to="/signup" className="border rounded px-3 py-1">Signup</Link>
            <Link to="/login" className="border rounded px-3 py-1">Login</Link>
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