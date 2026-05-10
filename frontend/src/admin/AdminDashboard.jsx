import React from 'react'
import Navbar from '../common/Navbar'
import { Outlet } from 'react-router'

const AdminDashboard = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default AdminDashboard
