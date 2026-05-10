import { Routes, Route } from "react-router";

import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import User from '../user/User';

import Organization from "../super_admin/Organization";
import SuperDashboard from "../super_admin/SuperDashboard";
import CreateOrganization from "../super_admin/CreateOrganization";
import AdminDashboard from "../admin/AdminDashboard";
import Features from "../features/Features";
import CreateFeature from "../features/CreateFeature";
import UserFeatures from "../user/UserFeatures";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<User />} >
      <Route path="features" element={<UserFeatures />} />
      </Route>

      <Route path="/superadmin" element={<SuperDashboard />}>
        <Route path="orgs" element={<Organization />} />
        <Route path="create-org" element={<CreateOrganization />} />
      </Route>
       <Route path="/admin" element={<AdminDashboard />} >
       <Route path="features" element={<Features />} />
       <Route path="create-feature" element={<CreateFeature />} />
       </Route>
    </Routes>
  );
}

export default Router;