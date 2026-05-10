import React, { useEffect, useState } from "react";

const Features = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const loadFeatures = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/feature`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch");
      }

      setFeatures(data || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  const toggleFeature = async (id, current) => {
    if (role !== "ADMIN") {
      alert("Only admin can update features");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/feature/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          enabled: !current
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      loadFeatures();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading features...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Features</h2>

      {features.length === 0 ? (
        <p>No features found</p>
      ) : (
        features.map((f) => (
          <div
            key={f._id}
            className="flex justify-between border p-2 mb-2"
          >
            <span>{f.key}</span>

            <button
              onClick={() => toggleFeature(f._id, f.enabled)}
              disabled={role !== "ADMIN"}
              className={`px-3 py-1 text-white ${
                f.enabled ? "bg-green-500" : "bg-red-500"
              } ${role !== "ADMIN" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {f.enabled ? "ON" : "OFF"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Features;