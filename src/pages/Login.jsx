import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';  // Corrected import
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import '../styles/Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false); // Clear previous alerts
    setIsLoading(true);  // Start loading

    if (!userId && !email) {
      setAlertMessage('Either User ID or Email must be provided');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    if (!password) {
      setAlertMessage('Password is required');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://backendofroomrent.onrender.com/api/auth/login', { userId, email, password });

      console.log('Login response:', response.data);

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.userId || userId); 
        setAlertMessage('Login successful!');
        setShowAlert(true);
        setIsLoading(false);
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to the dashboard
        }, 2000); // Redirect after 2 seconds
      } else {
        setAlertMessage('Unexpected response from server');
        setShowAlert(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setAlertMessage(error.response && error.response.data.msg ? error.response.data.msg : 'Server error');
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };
  const loginContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundImage: 'url("/assets/slide3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="login-container" style={loginContainerStyle}>
      <div className="login-content">
        <button onClick={handleBack} className="btn btn-secondary mb-3 backbtn">
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
        
        <h2 className="mb-4">Login</h2>
        {showAlert && <Alert variant={alertMessage === 'Login successful!' ? 'success' : 'danger'}>{alertMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="end">
            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <p className='p1'>Don't have an account? <Link to="/signup">Create here</Link></p>
            <p className="forgot-password mt-3">
              Forgot <Link to="/forgot-password">password?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
