import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the form fields
    if (!userId && !email) {
      setAlertMessage('Either User ID or Email must be provided');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailPattern.test(email)) {
      setAlertMessage('Invalid email address');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setAlertMessage('Password should be at least 6 characters');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://backendofroomrent.onrender.com/api/auth/register', { userId, email, password });
      console.log('Form submitted:', response.data);
      // Show success message and redirect to login page
      setAlertMessage('Registration successful!');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        setAlertMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        setAlertMessage('No response from server');
      } else {
        setAlertMessage('Error: ' + error.message);
      }
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='bggg'>
      <img src="/assets/slide3.jpg" alt="" />
      <Container className="signup-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="signup-form">
              <button onClick={handleBack} className="btn btn-secondary mb-3 backbtn">
                <i className="fas fa-arrow-left"></i> Back to Home
              </button>
              
              <h2 className="mb-4">Signup</h2>
              {showAlert && <Alert variant={alertMessage === 'Registration successful!' ? 'success' : 'danger'}>{alertMessage}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUserId">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Signing Up...' : 'Signup'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
