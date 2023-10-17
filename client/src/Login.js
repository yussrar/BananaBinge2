import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider'; // Import the user context



const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const message = new URLSearchParams(location.search).get('message');
  const { setUser } = useUser();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Invalid email format');
    } else if (formData.password.length > 20) {
      setErrorMessage('Password should be less than 20 characters');
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          const data = await response.json();
          const user = data.user;
          setUser(user);
          // Navigate to the Home component and send user data as state
          navigate('/Home');

        } else {
          setErrorMessage('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form>
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
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <p>
        Not a user? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
