
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Todo from './components/todo';

import Registerpage from './pages/Registerpage';
import './App.css'
function App() {
  
  // const[users,setUsers] =useState([]);

  // useEffect(()=>{
  //   axios.get('http://localhost:3001').then((res)=>{
  //    setUsers(res.data)
  //   }).catch((error)=>{
  //     console.log(error,'Oops crashed')

    
  //       console.error('Error:', error);
  //       console.error('Error message:', error.message);
  //       console.error('Error stack:', error.stack);
      

  //   })
  // },[]);
  // console.log(users)
  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing/>} />
          <Route path="/Landing" element={<Landing/>} />
        
          <Route path="/Login" element={<Login/>}/>
          <Route path='/' element={<Registerpage/>}>
          <Route path=':id' element={<Todo/>}/>
          </Route> 
          <Route path='/Home' element={<Home/>}></Route>
          </Route>
        
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
