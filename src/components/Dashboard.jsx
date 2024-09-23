import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/login'); // Navigates to the previous page
  };

  const handleCreateNew = () => {
    navigate('/upload-detail'); // Navigates to the form for creating new detail
  };

  const handleViewYourDetails = () => {
    navigate('/mydata'); // Navigates to the page where the user can view their uploads
  };
  const handleLogout = async () => {
    // Confirm logout
    const confirmed = window.confirm('Are you sure you want to log out?');
    
    if (!confirmed) {
      return; // Exit if the user cancels
    }
  
    try {
      const response = await fetch('/api/logout', {
        method: 'DELETE', // Use DELETE method for logout
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send token if required by the backend
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) throw new Error('Logout failed');
  
      localStorage.removeItem('token'); // Clear authentication token
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout Error:', error);
      alert('Logout failed. Please try again.');
    }
  };
  
  return (
    <div className="dashboard-container">
      <button onClick={handleBack} className="btn back-btn">Back</button> {/* Back Button */}
      <div className="dashboard-content">
        <h2>Welcome to Your Dashboard</h2>
        <button onClick={handleCreateNew} className="btn btn-primary new">Create New Detail</button>
        <button onClick={handleViewYourDetails} className="btn btn-secondary edit">View/Edit Your Details</button>
      <button onClick={handleLogout} className="btn logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
