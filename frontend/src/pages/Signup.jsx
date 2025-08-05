import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { authDataContext } from '../context/authContext';
import axios from "axios";

function Signup() {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        (serverUrl || "http://localhost:8000") + "/api/auth/signup",
        {
          firstName,
          lastName,
          userName,
          email,
          password
        },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setLoading(false);
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error?.response?.data || error.message || "Signup error");
      setErr(error?.response?.data?.message || "Signup error");
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen bg-white flex flex-col items-center justify-start gap-[10px]'>
      <div className='px-8 pt-6 w-full flex items-center'>
        <img src={logo} alt="Logo" className='h-6 md:h-7 object-contain' />
      </div>

      <form
        className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col justify-center gap-[10px] p-[15px]'
        onSubmit={handleSignUp}
      >
        <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Sign Up</h1>

        <input
          type="text"
          placeholder='First Name'
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
        />
        <input
          type="text"
          placeholder='Last Name'
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
        />
        <input
          type="text"
          placeholder='Username'
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
        />
        <input
          type="email"
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
        />

        <div className='relative w-full'>
          <input
            type={show ? 'text' : 'password'}
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md pr-[60px]'
          />
          <button
            type='button'
            onClick={() => setShow(!show)}
            className='absolute right-[15px] top-[50%] translate-y-[-50%] text-sm font-medium text-blue-500 hover:underline'
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>

        {err && <p className='text-center text-red-500'>*{err}</p>}

        <button
          className='w-full h-[50px] rounded-full bg-[#1dc9fd] mt-[30px] text-white'
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p className='text-center cursor-pointer'>
          Already have an account?{" "}
          <span
            className='text-[#24b2ff]'
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;

