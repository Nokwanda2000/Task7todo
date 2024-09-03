import React from 'react';
import { Link } from 'react-router-dom';
function Loginpage() {
 return (
    <>
    <div className="container" style={{  display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"}}>

        <div className="card" style={{ backgroundColor:"#fff" ,
            borderRadius:"10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            width: "500px"}}>

            <div className="card-header" style={{ textAlign: "center",
            marginBottom: "20px"}}>
                <h2 style={{  margin: "0",
            fontSize: "24px",}}>Sign in to Task Manager</h2>
            </div>


            <div className="card-body" style={{   display: "flex"}}>
            <div className="card-left" style={{width: "50%",
            paddingRight: "20px"}}>
                    <form>
                        <div class="form-group" style={{marginBottom: "20px"}}>
                            <label for="email" class="form-label" style={{  display: "block",
                                                                        marginBottom: "5px",
                                                                       fontWeight: "bold"}}>Email</label>
                            <input type="email" id="email" className="form-input" placeholder="Enter your email" style={{  width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxSizing: "border-box",}}/>
                        </div>


                        <div className="form-group" style={{marginBottom: "20px"}}>
                            <label for="password" class="form-label" style={{  display: "block",
                                                                        marginBottom: "5px",
                                                                       fontWeight: "bold"}}>Password</label>
                            <input type="password" id="password" className="form-input" placeholder="Enter your password" style={{  width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxSizing: "border-box",}}/>
                        </div>


                        <button type="submit" className="btn" style={{ backgroundcolor: "#4CAF50",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",}}>Sign In</button>
                        {/* <div class="social-media">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div> */}
                        <div className="forgot-password">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </form>
                </div>
                <div className="card-right" style={{  width: "50%",
            backgroundColor: "blue",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",}}>

                    <h3 style={{ margin: "0",
            fontSize: "20px",
            marginBottom: "20px"}}>Hello, Friend!</h3>
                    <p style={{ margin: "0px",
            fontSize: "16px",}}>Enter your personal details and start journey with us</p>
               <Link to='./register.jsx' > <button class="btn2" style={{
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",}}>Sign Up</button></Link>
                </div>
            </div>
        </div>
       
       
    </div>
     {/* <footer className="footer">
     <p style={{ fontSize: "14px", color: "#999" }}>
       Copyright © 2024 Task Manager. All rights reserved.
     </p>
   </footer> */}
   </>
  );
}

export default Loginpage;