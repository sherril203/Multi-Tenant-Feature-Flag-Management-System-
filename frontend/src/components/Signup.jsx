import React from 'react'
import { useState } from 'react'
const Signup = () => {
    const initialstate=[
        {
            username:"",
            email:"",
            password:"",
            role:""
        }
    ]
    const [form,setform]=useState(initialstate)
  return (
    <div>
      <form action="">
        <p>Sign Up</p>
        <div>
            <label>Username</label>
            <input type="text" />
                        </div>
        <div>
            <label htmlFor="">Email</label>
            <input type="email" />
        </div>
        <div>
            <label htmlFor="">Password</label>
            <input type="password" name="" id="" />
        </div>
        <div>
            <label htmlFor="">Role</label>
            <select name="" id="">
                <option value="">Select role</option>
                <option value="">user</option>
                <option value="">Admin</option>

            </select>
        </div>
        <button><Link to="/login">Register</Link></button>
      </form>
    </div>
  )
}

export default Signup
