import { useState } from "react";
import Navbar from "../common/Navbar";

const userFeatures=()=> {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [key, setKey] = useState("");

  const checkFeature = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (!key.trim()) {
        alert("Enter feature key");
        return;
      }

      const res = await fetch(
        `${BASE_URL}/feature/check?key=${key}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error");
        return;
      }

      alert(data.enabled ? "Feature Enabled ✅" : "Feature Disabled ❌");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>


      <div className="p-4">
        <h2 className="text-xl mb-4">User Feature Check</h2>

        <input
          placeholder="Enter Feature Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={checkFeature}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Check Feature
        </button>
      </div>
    </div>
  );
}
export default userFeatures