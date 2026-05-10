import { useState } from "react";
import Navbar from "../common/Navbar";
import { Outlet } from "react-router";

const User=()=> {


  return (
    <div>
      <Navbar />
      <Outlet/>

      
    </div>
  );
}
export default User