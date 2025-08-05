import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { authDataContext } from '../context/authContext';
import axios from "axios";


  function Login() {
    const [show, setShow] = useState(false);
    let { serverUrl } = useContext(authDataContext);
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading]=useState(false);
    let [err, setErr]=useState("");
  
    const handleSignIn = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        let result = await axios.post(
          (serverUrl || "http://localhost:8000") + "/api/auth/login",
          {
            email,
            password
          },
          { withCredentials: true }
        );
        console.log(result);
        setErr("");
        setLoading(false);
        setEmail("")
        setPassword("")
      } catch (error) {
        console.log(error?.response?.data || error.message || "Signup error");
        setErr(error.response.data.message)
        setLoading(false);
      }
    };
  
    return (
      <div className='w-full h-screen bg-white flex flex-col items-center justify-start gap-[10px]'>
        <div className='px-8 pt-6 w-full flex items-center'>
          <img src={logo} alt="Logo" className='h-6 md:h-7 object-contain' />
        </div>
  
        <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col justify-center gap-[10px] p-[15px]' onSubmit={handleSignIn}>
          <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Log In</h1>
  
          <input type="email" placeholder='email' required className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' onChange={(e) => setEmail(e.target.value)} />
  
          <div className='relative w-full'>
            <input
              type={show ? 'text' : 'password'}
              placeholder='password'
              required
              className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md pr-[60px]'
              onChange={(e) => setPassword(e.target.value)} />
            <button
              type='button'
              onClick={() => setShow(!show)}
              className='absolute right-[15px] top-[50%] translate-y-[-50%] text-sm font-medium text-blue-500 hover:underline'
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          {err && <p className='text-center text-red-500'>*{err}</p>}
          <button className='w-full h-[50px] rounded-full bg-[#1dc9fd] mt-[30px] text-white' disabled={loading}>{loading?"Loading...":"Log In"}</button>
          <p className='text-center cursor-pointer'>Want to create a new account? <span className='text-[#24b2ff]' onClick={() => navigate("/signup")}>Sign Up</span></p>
        </form>
      </div>
    );
  }

export default Login
