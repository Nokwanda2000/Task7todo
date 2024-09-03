import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/Layout';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Home from './pages/Home';

import Registerpage from './pages/Registerpage';
import './App.css'
function App() {
  

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing/>} />
          <Route path="/Landing" element={<Landing/>} />
        
          <Route path="/Login" element={<Login/>}/>
          <Route path='/Registerpage' element={<Registerpage/>}>
          </Route> 
          <Route path='/Home' element={<Home/>}></Route>
          </Route>
        
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
