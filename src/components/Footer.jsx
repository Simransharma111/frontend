import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Footer.css'; // Import your CSS file for styling
import { FaInstagram, FaFacebookF } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>Welcome to our site. It will help you find the best destinations for quality room rentals in Your City/Region. We specialize in providing comfortable and convenient accommodations tailored to meet the diverse needs of our clients.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/roomlist">Rooms</Link></li>
                            {/* <li><Link to="/about">About</Link></li> */}
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Kullu, Himachal</li>
                            <li>roomrentall76@gmail.com</li>
                        </ul>
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled social-links">
                            <li><a href="https://www.instagram.com/roomrent2229?utm_source=qr&igsh=MXRveHc3MWhqZnB6cg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a></li>
                            <li><a href="https://www.facebook.com/share/Ax2rDa9Qyjn9uZ9R/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">
                            &copy; {new Date().getFullYear()} RoomRental | All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
