import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      alert('successsfully registered')
      navigate('/home'); // Navigate to home after successful registration
    } catch (error) {
      console.error("Registration error", error);
      setErrorMessage(error.response ? error.response.data.error : 'Registration failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-container" >
      <h3 style={{ marginLeft: "90px", color:"purple" }}>Register using your details</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Register</h2>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
            style={{
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
              marginBottom: '20px',
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-input"
            style={{
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
              marginBottom: '20px',
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            style={{
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
              marginBottom: '20px',
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
              marginBottom: '20px',
            }}
          />
        </div>
        <p style={{ color: successMessage ? 'green' : 'red' }}>
          {successMessage || errorMessage}
        </p>
        <button
          type="submit"
          className="register-button"
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
