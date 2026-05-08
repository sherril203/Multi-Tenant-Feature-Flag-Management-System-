import React from 'react'
import {useState} from "react" 
import { Link,useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();

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

  // ✅ Super Admin check (before API call)
  if (
    form.email === SUPER_ADMIN_EMAIL &&
    form.password === SUPER_ADMIN_PASSWORD
  ) {
    localStorage.setItem("role", "SUPER_ADMIN");
    navigate("/superadmin"); 
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/login", {
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

    // ✅ store token
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);

    // ✅ role-based redirect
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

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>


        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded font-bold"
        >
          Login
        </button>

        <p className="text-center mt-3">
        new account?{" "}
          <Link to="/signup" className="text-blue-500">
           SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login
