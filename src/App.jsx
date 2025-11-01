import React from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutOne from './Layouts/LayoutOne'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const App = () => {
  const myRoute = createBrowserRouter(createRoutesFromElements(
    <Route >
      <Route path='/' element={<LayoutOne/>}>
        <Route index element={<Home/>}/>
      </Route>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
    </Route>
  ))



  return (
    <>
            <ToastContainer />

    <RouterProvider router={myRoute}/>

    </>
  )
}

export default App