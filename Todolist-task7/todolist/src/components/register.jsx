import React, { useState, useEffect } from 'react';
import initSqlJs from 'sql.js'; // Import the initSqlJs function
import { Link } from 'react-router-dom';
import Home from '../pages/Home';
import axios from 'axios';

let SQL;

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // Add a state for success message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    initSqlJs().then((SQLJs) => {
      SQL = SQLJs;
      const db = new SQL.Database(); // Create a new database instance
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          firstName TEXT,
          lastName TEXT,
          email TEXT,
          password TEXT
        );
      `);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = new SQL.Database(); // Create a new database instance
      db.run(`
        INSERT INTO users (firstName, lastName, email, password)
        VALUES (?, ?, ?, ?)
      `, [formData.firstName, formData.lastName, formData.email, formData.password]);
      setSuccessMessage('User registered successfully!'); // Set success message
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error(error);
      setSuccessMessage('Error registering user. Please try again.'); // Set error message
    }
  };

  return (
    <div className="register-container" style={{padding:"30px"}}>
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
        <p style={{ color: successMessage === 'User registered successfully!' ? 'green' : 'red' }}>
          {successMessage}
        </p>
        <Link to='/Home'> 
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
        </Link>
      </form>
    </div>
  );
}