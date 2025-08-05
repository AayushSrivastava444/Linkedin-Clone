import React, { useState, useContext } from 'react';
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import { FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { authDataContext } from '../context/authContext';

function Navbar() {
  const [activeSearch, setActiveSearch] = useState(false);
  const { userData } = useContext(authDataContext); // only read userData

  return (
    <div className='w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex justify-between md:justify-around items-center px-[10px]'>
      <div className='flex justify-center items-center gap-[10px]'>
        <div onClick={() => setActiveSearch(false)}>
          <img src={logo2} alt="Logo" className='w-[50px]' />
        </div>
        {!activeSearch && (
          <div>
            <FaSearch className='w-[23px] h-[23px] text-gray-600 lg:hidden' onClick={() => setActiveSearch(true)} />
          </div>
        )}
        <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${!activeSearch ? "hidden" : "flex"}`}>
          <div>
            <FaSearch className='w-[23px] h-[23px] text-gray-600' />
          </div>
          <input
            type="text"
            className='w-[80%] h-full bg-transparent outline-none border-0'
            placeholder='search users...'
          />
        </form>
      </div>

      <div className='flex justify-center items-center gap-[20px]'>
        <div className='w-[300px] h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]'>
          <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
            <img src={logo3} className='w-full h-full' alt="Profile" />
          </div>
          <div>
            {userData ? (
              <div>{`${userData.firstName} ${userData.lastName}`}</div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden'>
          <IoHomeSharp className='w-[23px] h-[23px] text-gray-600' />
          <div>Home</div>
        </div>
        <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden'>
          <FaUserFriends className='w-[23px] h-[23px] text-gray-600' />
          <div>My Networks</div>
        </div>
        <div className='flex flex-col items-center justify-center text-gray-600'>
          <IoMdNotifications className='w-[23px] h-[23px] text-gray-600' />
          <div className='hidden md:block'>Notifications</div>
        </div>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
          <img src={logo3} className='w-full h-full' alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
