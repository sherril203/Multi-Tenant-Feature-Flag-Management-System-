import React from 'react'

const Login = () => {
    const initialstate=[
        {
            username:"",
            email:"",
            password:"",
        }
    ]
    const [form,setform]=useState(initialstate)
  return (
    <div> 
      <form action="">
        <p>Login</p>
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
      
        <button><Link to="/login">login</Link></button>
      </form>
    </div>
  )
}

export default Login
