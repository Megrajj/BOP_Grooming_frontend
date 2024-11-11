import React from 'react';
import './AboutUs.css'; // Import custom CSS for AboutUs page

const AboutUs = () => {
    return (
        <div className="container about-container">
            <div className="about-header">
                <h1 className="text-center">About BOP Auto Grooming</h1>
            </div>
            <div className="about-content">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Our Commitment</h3>
                                <p className="card-text">We are dedicated to providing top-quality auto grooming services. Our team of professionals is passionate about vehicle care and committed to ensuring customer satisfaction.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Contact Us</h3>
                                <ul className="list-group list-group-flush contact-info">
                                    <li className="list-group-item"><strong>Location:</strong> 134 Vale Street, Otūmoetai, Tauranga 3110</li>
                                    <li className="list-group-item"><strong>Phone:</strong> 02041688600</li>
                                    <li className="list-group-item"><strong>Email:</strong> bopautogrooming@gmail.com</li>
                                    <li className="list-group-item"><strong>Operating Hours:</strong> Every day from 8 am to 8 pm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-footer">
                <p className="text-center">Visit us today for all your auto grooming needs!</p>
            </div>
        </div>
    );
}

export default AboutUs;
