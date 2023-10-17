import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all required fields.');
    } else if (formData.name.length > 15) {
      setErrorMessage('Name should be less than 15 characters');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Invalid email format');
    } else if (formData.password.length > 20) {
      setErrorMessage('Password should be less than 20 characters');
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
            const successMessage = 'Registration successful! You can now log in.';
            navigate('/login?message=' + encodeURIComponent(successMessage));
        } else {
            setErrorMessage('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
      <p>
        Already a user? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Register;
