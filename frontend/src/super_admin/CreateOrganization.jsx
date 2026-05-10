import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateOrganization = () => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    code: ""
  };
const BASE_URL = import.meta.env.VITE_API_URL
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.code) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/org`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        name: form.name,
        code: form.code.toUpperCase(),
        secret: "SUPER_ADMIN_123"
      })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.message || "Error");
      return;
    }

    alert("Organization created!");

    setForm(initialState);

    navigate("/superadmin");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="border p-6 rounded w-80 shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Organization
        </h2>

        <div>
          <label>Organization Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
        </div>

        <div>
          <label>Code</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateOrganization;