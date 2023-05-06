import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    let navigate = useNavigate();
    // const host = "https://ruyaqr.deta.dev"
    const host = "http://localhost:5000"
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          //   "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYmM2MzJhZTI2MDE5ODA3Mjc4YWRjIn0sImlhdCI6MTY1NzU1NjY0NX0.7vSXMTn4HzY8X059oTJhF8waxQ2y2PhWgyiCFL_RBcQ'
    
          },
          body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success)
        {
          // / Save the auth token and redirect
          localStorage.setItem('token',json.authtoken);
          navigate("/")
          props.showAlert("Account Created Successfully", "success")
        }
        else
        {
          props.showAlert("Invalid", "danger")
        }
        
    }

    const onChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    }
  return (
    // <div className='container mt-2'>
    //     <h2 className='my-2'>Create an account to add your notes</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label htmlFor="name" className="form-label">Name</label>
    //       <input type="text" className="form-control" id="name" name="name" onChange={onChange}/>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="email" className="form-label">Email address</label>
    //       <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email"/>
    //         <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="password" className="form-label">Password</label>
    //       <input type="password" className="form-control" id="password" onChange={onChange} name="password" required minLength={5}/>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    //       <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" required minLength={5}/>
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </form>
    // </div>
    <div className='container mt-2'>
  <div className='row'>
    <div className='col-md-4'>
      <h2 className='my-2'>Register to use <span style={{color:'green'}}>GreenBook</span></h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
    <div className='col-md-8 d-flex justify-content-center align-items-center'>
      <div style={{ flexDirection: 'column' }}>
        <h2 className='my-2'>Welcome To</h2>
        <p style={{textAlign: 'center',
            color: 'green',
            fontWeight: 700,
            fontSize: 'xx-large'}}>GreenBook</p>


      </div>
    </div>
  </div>
</div>

  )
}

export default Signup