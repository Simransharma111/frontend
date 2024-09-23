import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success'); // To dynamically set alert variant
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    setIsLoading(true);

    try {
      const response = await axios.post('https://backend-gamma-nine-69.vercel.app/api/request-password-reset', { email });
      setAlertMessage('Password reset link sent to your email.');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error sending reset link:', error); // Log error for debugging
      setAlertMessage(error.response?.data?.message || 'Error requesting password reset.');
      setAlertVariant('danger');
    } finally {
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <h2 className="mb-4">Forgot Password</h2>
        {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
