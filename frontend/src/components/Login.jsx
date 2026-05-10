import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const SUPER_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const SUPER_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Super Admin login
    if (
      form.email === SUPER_ADMIN_EMAIL &&
      form.password === SUPER_ADMIN_PASSWORD
    ) {
      localStorage.setItem("role", "SUPER_ADMIN");
      localStorage.setItem("token", "super_admin_dummy");
      navigate("/superadmin");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ store values
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);

      // ✅ redirect
      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded shadow-md bg-white w-80"
      >
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded font-bold">
          Login
        </button>

        <p className="text-center mt-3">
          New account? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;