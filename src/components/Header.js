import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaFacebookMessenger, FaTiktok } from 'react-icons/fa';
import '../styles/Header.css'; // Import custom CSS for Header styling

const Header = () => {
    return (
        <header>
            <Navbar expand="lg" className="navbar-custom" variant="light">
                <Container>
                    <Navbar.Brand href="/" className="navbar-brand">
                        <img
                            src="logo.png"
                            width="95"
                            height="95"
                            alt="Logo"
                        />
                        Bop Auto Grooming
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto navbar-nav">
                            <Nav.Link href="/" className="nav-link">Home</Nav.Link>
                            <Nav.Link href="/services" className="nav-link">Services</Nav.Link>
                            <Nav.Link href="/booking" className="nav-link">Booking</Nav.Link>
                            <Nav.Link href="/my-booking" className="nav-link">My Bookings</Nav.Link>
                            <Nav.Link href="/aboutus" className="nav-link">About Us</Nav.Link>
                        </Nav>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/bopautogroomers" target="_blank" rel="noreferrer"><FaFacebookMessenger /></a>
                            <a href="https://www.tiktok.com/@bopautogrooming?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer"><FaTiktok /></a>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
