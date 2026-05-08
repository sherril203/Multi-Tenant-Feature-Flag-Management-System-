import { Routes, Route } from "react-router";
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import User from '../user/User'
import Organization from "../super_admin/Organization";
import SuperDashboard from "../super_admin/SuperDashboard";

function Router() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User/>} />
           <Route path="/superadmin" element={<SuperDashboard/>}>
          <Route path="orgs" element={<Organization/>} />
          </Route>
          
      </Routes>
  );
}

export default Router;