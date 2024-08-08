import React,{useState} from 'react'
import Layout from './../../components/Layouts/Layout';
import {toast} from'react-toastify'
import axios from'axios'
import { useNavigate,useLocation } from 'react-router-dom';
import "./../../styles/AuthStyle.css"
import { useAuth } from '../../context/auth';
const Login = () => {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[auth,setAuth]=useAuth()

 const navigate=useNavigate()
 const location=useLocation()

    //handle submit
    const handlesubmit=async(e)=>{
    e.preventDefault();
   try {
    const res=await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password}
        );
        if(res.data.success){
        alert(res.data.message)
        setAuth({...auth,
        user:res.data.user,
        token:res.data.token,
        })
        localStorage.setItem('auth',JSON.stringify(res.data))
         navigate(location.state||'/')
        }
        else{
        toast.error(res.data.message)
        }
   } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
    alert("You are not registered Firstly,registered then login ")
   
   }
    }
  return (
<Layout title={"register"}>
      <div className="form-container">
        <form onSubmit={handlesubmit}>
          <h4 className="title">LOGIN FORM</h4>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Forgot Password
            </button>
          </div>

          
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
