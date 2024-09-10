import React from 'react';
import Image from "../assets/Gemini_Generated_Image_5swixj5swixj5swi.jfif"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Landingpage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login'); // Assuming you have a route defined for /login
  };

  return (
    <div className="container">
      <main className="main">
        <section className="hero">
          <div className="hero-text">
            <h1 style={{color:"purple"}}>Easily Manage Your Daily Tasks</h1>
            <p style={{fontColor:"black"}}>Overwhelmed by your daily tasks? Get them under control with a todolist</p>
          </div>
          <div className="hero-image" style={{width:"300px", height:"400px", boxShadow:"1px 1px 1px blue"}}>
            <img src={Image} style={{width:"320px", height:"300px", borderRadius:"20px"}} alt="Hero image" />
          </div>
        </section>

        <section className="pricing">
          <h2>Simply manage your todos</h2>
          <div className="pricing-grid">
            <div className="price">
              
         
        
              <p style={{ fontSize: "16px", color: "#999" }}>Already have an accout simple click the Sign In button to sign in?</p>
              <button onClick={handleSignInClick} type="button">Sign In</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landingpage;