import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const CreateFeature = () => {
  const BASE_URL = import.meta.env.VITE_API_URL ;

  const navigate = useNavigate();

  const [form, setForm] = useState({
    key: "",
    enabled: false
  });

  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // ✅ Proper auth handling
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (role !== "ADMIN") {
      navigate("/");
    }
  }, [token, role, navigate]);

  const createFeature = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/feature`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed");
      }

      return result;
    } catch (err) {
      return { error: true, message: err.message };
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedKey = form.key.trim().toLowerCase(); // ✅ consistent format

    if (!trimmedKey) {
      alert("Feature key is required");
      return;
    }

    setLoading(true);

    const res = await createFeature({
      key: trimmedKey,
      enabled: form.enabled
    });

    setLoading(false);

    if (!res || res.error) {
      if (res?.message?.includes("exists")) {
        alert("Feature already exists ⚠️");
      } else {
        alert(res?.message || "Error");
      }
      return;
    }

    alert("Feature created successfully ✅");
    setForm({ key: "", enabled: false });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-80 shadow bg-white"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Feature
        </h2>

        <input
          name="key"
          value={form.key}
          onChange={handleChange}
          placeholder="Feature Key (e.g., chat, dark_mode)"
          className="border p-2 w-full mb-3 lowercase"
        />

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="enabled"
            checked={form.enabled}
            onChange={handleChange}
          />
          Enabled
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 w-full rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Feature"}
        </button>
      </form>
    </div>
  );
};

export default CreateFeature;