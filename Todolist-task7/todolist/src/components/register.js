import React, { useState } from 'react';
const sqlite3 = require('sqlite3').verbose();

const openDatabase = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database.db', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = await openDatabase();
      await db.run(`
        INSERT INTO users (firstName, lastName, email, password)
        VALUES (?, ?, ?, ?)
      `, [formData.firstName, formData.lastName, formData.email, formData.password]);
      await closeDatabase(db);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="register-container">
      <h3>Register using your details</h3>
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
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;