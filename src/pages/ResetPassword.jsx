import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // Token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    setIsLoading(true);

    try {
      // Use template literals to include token in the URL
      const response = await axios.post(`https://backendofroomrent.onrender.com/api/reset-password/${token}`, { password });
      setAlertMessage('Password reset successful!');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (error) {
      setAlertMessage('Error resetting password.');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <h2 className="mb-4">Reset Password</h2>
        {showAlert && <Alert variant={alertMessage.includes('successful') ? 'success' : 'danger'}>{alertMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
