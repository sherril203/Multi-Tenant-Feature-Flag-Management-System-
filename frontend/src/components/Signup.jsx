import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    orgId: ""
  });

  const [orgs, setOrgs] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);

  // ✅ Fetch organizations
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/getorg`);
        const data = await res.json();
        setOrgs(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load organizations");
      } finally {
        setLoadingOrgs(false);
      }
    };

    fetchOrgs();
  }, [BASE_URL]);

  // ✅ Handle change (reset orgId when role changes)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      setForm({ ...form, role: value, orgId: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validations
    if (!form.username || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (!form.role) {
      alert("Please select a role");
      return;
    }

    if ((form.role === "ADMIN" || form.role === "USER") && !form.orgId) {
      alert("Please select an organization");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
          orgId: form.orgId
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful!");
      navigate("/login");

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
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

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

        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* ✅ Organization dropdown */}
        {(form.role === "ADMIN" || form.role === "USER") && (
          <div className="mb-3">
            <label>Organization</label>
            <select
              name="orgId"
              value={form.orgId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">
                {loadingOrgs ? "Loading organizations..." : "Select Organization"}
              </option>

              {!loadingOrgs &&
                orgs.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name} ({org.code})
                  </option>
                ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded font-bold"
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;