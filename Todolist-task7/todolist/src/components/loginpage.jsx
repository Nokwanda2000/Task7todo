import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      // Handle successful login (e.g., store token, navigate to dashboard, etc.)
      console.log('Login successful:', response.data);
      navigate('/Home'); // Navigate to a protected route
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage(error.response ? error.response.data.error : 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="card" style={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", padding: "30px", width: "500px" }}>
          <div className="card-header" style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: "0", fontSize: "24px" }}>Sign in to Task Manager</h2>
          </div>

          <div className="card-body" style={{ display: "flex" }}>
            <div className="card-left" style={{ width: "50%", paddingRight: "20px" }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label htmlFor="email" className="form-label" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", boxSizing: "border-box" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label htmlFor="password" className="form-label" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", boxSizing: "border-box" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {errorMessage && <p style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</p>}

                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#4CAF50", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s" }}
                >
                  Sign In
                </button>

                <div className="forgot-password" style={{ marginTop: "20px" }}>
                  <a href="#">Forgot your password?</a>
                </div>
              </form>
            </div>

            <div className="card-right" style={{ width: "50%", backgroundColor: "blue", color: "#fff", padding: "20px", borderRadius: "10px" }}>
              <h3 style={{ margin: "0", fontSize: "20px", marginBottom: "20px" }}>Hello, Friend!</h3>
              <p style={{ margin: "0", fontSize: "16px" }}>Enter your personal details and start your journey with us</p>
              <Link to='/registerpage'>
                <button
                  className="btn2"
                  style={{ backgroundColor: "#007BFF", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s" }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
