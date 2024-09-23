import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    setIsLoading(true);

    try {
      const response = await axios.post('https://backend-gamma-nine-69.vercel.app/api/contact', { name, email, message });
      setAlertMessage('Message sent successfully!');
      setShowAlert(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setAlertMessage('Error sending message.');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h2 className="mb-4">Contact Us</h2>
        {showAlert && <Alert variant={alertMessage.includes('success') ? 'success' : 'danger'}>{alertMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="form-group contact">
            <label>Name</label>
            <input
              type="text"
              className="form-control contact"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group contact">
            <label>Email</label>
            <input
              type="email"
              className="form-control contact"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group contact">
            <label>Message</label>
            <textarea
              className="form-control contact"
              rows="5"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="social-media-section mt-4">
          <h4>Connect with us on social media:</h4>
          <a
            href="https://www.instagram.com/roomrent2229?utm_source=qr&igsh=MXRveHc3MWhqZnB6cg=="
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <FaInstagram size={32} />
            <span className="ml-2">Send us a direct message on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
