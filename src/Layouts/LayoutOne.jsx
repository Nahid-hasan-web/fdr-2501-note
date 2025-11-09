import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'

const LayoutOne = () => {

  const userInfo = useSelector((state)=>state.currentUser.value)
  const navigate = useNavigate()


useEffect(()=>{
    if(!userInfo){
    navigate('/login')
  }
},[])
  


  return (
    <>
    <Navbar/>
        <Outlet/>
    </>
  )
}

export default LayoutOne