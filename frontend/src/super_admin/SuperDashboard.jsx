import React from 'react'
import Navbar from '../common/Navbar'
import { Link } from 'react-router'
import { Outlet } from "react-router"
const SuperDashboard = () => {
  return (
    <div>
      <Navbar />
     
     <Outlet/>
    </div>
  )
}

export default SuperDashboard
