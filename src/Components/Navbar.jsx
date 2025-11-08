import React from 'react'
import { FiSearch, FiUser } from 'react-icons/fi'
import { IoHomeOutline } from 'react-icons/io5'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <>
    <nav className="w-full bg-[#48CFCB] px-6 py-4 flex justify-center items-center shadow-md">

        <div className="flex items-center gap-4">
                <ul className='flex items-center gap-5 '>
                    <li>
                         <NavLink to={'/'}
                         
                         className={({ isActive }) => isActive ? "text-xl font-medium w-[40px] h-[40px] rounded-full  bg-white text-black flex items-center justify-center" 
                          :
                        "text-xl font-medium w-[40px] h-[40px] rounded-full   text-white flex items-center justify-center"}><IoHomeOutline/></NavLink></li>
                    <li>
                         <NavLink to={'/bin'}
                         
                         className={({ isActive }) => isActive ? "text-xl font-medium w-[40px] h-[40px] rounded-full  bg-white text-black flex items-center justify-center" 
                          :
                        "text-xl font-medium w-[40px] h-[40px] rounded-full   text-white flex items-center justify-center"}><RiDeleteBin5Line/></NavLink>
                        
                        </li>
                </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar