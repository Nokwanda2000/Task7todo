
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
  
  const[todo,setTodo] =useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000').then((res)=>{
     setTodo(res.data)
    }).catch((error)=>{
      console.log(error,'Oops crashed')

    })
  },[]);
  console.log(todo)
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
