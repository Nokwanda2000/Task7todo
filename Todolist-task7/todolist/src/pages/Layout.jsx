import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/16659111-removebg-preview.png"
export default function Layout() {
  return (
    <>
    <div className='main'>
    
      <nav className='nav'>
       
        <ul>
        <img src={Logo} style={{width:"70px", height:"60px"}} alt="Logo" />
  
          <li>
            <Link to="/"></Link>
          </li>
          <li>
            <Link to="/Landing">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Registerpage">Register</Link>
          </li>
          
        </ul>
      </nav>
      <Outlet/>

      <footer className="footer">
        <p style={{ fontSize: "14px", color: "#999" }}>
          Copyright © 2024 Task Manager. All rights reserved.
        </p>
      </footer>
      </div>
    </>
  )
}
