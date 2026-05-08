import React from "react";
import Navbar from "../common/Navbar";

const Home = () => {
  return (
    <div >
<Navbar/>
<div className="p-6">
       <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Feature Flag Management System
        </h1>
        <p className="mt-3 text-gray-600">
          Control, manage, and deploy features dynamically across organizations.
        </p>
      </div>

  
      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-5 border rounded shadow">
          <h2 className="text-xl font-semibold">Multi-Tenant</h2>
          <p className="text-gray-600 mt-2">
            Each organization has its own isolated features and users.
          </p>
        </div>

        <div className="p-5 border rounded shadow">
          <h2 className="text-xl font-semibold">Feature Control</h2>
          <p className="text-gray-600 mt-2">
            Enable or disable features instantly without redeploying.
          </p>
        </div>

        <div className="p-5 border rounded shadow">
          <h2 className="text-xl font-semibold">🔐 Role-Based Access</h2>
          <p className="text-gray-600 mt-2">
            Super Admin, Admin, and Users have different permissions.
          </p>
        </div>

      </div>

      {/* Info Section */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold">Why Use This System?</h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          This platform allows organizations to roll out features safely,
          test new functionalities, and control user access efficiently.
        </p>
      </div>

</div>
 
    </div>
  );
};

export default Home;