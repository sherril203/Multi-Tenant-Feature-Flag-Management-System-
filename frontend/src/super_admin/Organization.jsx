import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { Link } from "react-router";

const BASE_URL = import.meta.env.VITE_API_URL;

const getOrganizations = async () => {
  try {
    const res = await fetch(`${BASE_URL}/getorg`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const Organization = () => {
  const [orgs, setOrgs] = useState([]);

  const loadOrgs = async () => {
    const data = await getOrganizations();
    setOrgs(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  return (
    <div>

      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Organizations</h2>

        <Link
          to="/superadmin/create-org"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Organization
        </Link>
      </div>

      <div className="p-4">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Organization ID</th>
              <th className="border p-2">Organization Name</th>
              <th className="border p-2">Organization Code</th>
            </tr>
          </thead>

          <tbody>
            {orgs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No organizations found
                </td>
              </tr>
            ) : (
              orgs.map((org) => (
                <tr key={org._id}>
                  <td className="border p-2">{org._id}</td>
                  <td className="border p-2">{org.name}</td>
                  <td className="border p-2">{org.code}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Organization;