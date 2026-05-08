import React from 'react'
import Navbar from '../common/Navbar'
import { Link } from 'react-router'

const SuperDashboard = () => {
  return (
    <div>
      <Navbar/>
      <div className='p-4'>
        <p>New Organizations <Link to="/create-org" className='bg-blue-500 text-white p-3 font-bold rounded'>Create Organization</Link></p>
      </div>
    </div>
  )
}

export default SuperDashboard
