import React from 'react';
import { FaFacebookMessenger, FaTiktok } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-info">
                    <p>&copy; 2024 BOP Auto Grooming</p>
                    <p>
                        Contact us: 134 Vale Street, Otūmoetai, Tauranga 3110 <br />
                        Phone: 02041688600 | Email: <a href="mailto:bopautogrooming@gmail.com">bopautogrooming@gmail.com</a> <br />
                        Operating Hours: Every day from 8 am to 8 pm
                    </p>
                </div>
                <div className="social-icons">
                <a href="https://www.facebook.com/bopautogroomers" target="_blank" rel="noreferrer"><FaFacebookMessenger /></a>
                <a href="https://www.tiktok.com/@bopautogrooming?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer"><FaTiktok /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
