import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Booking from './pages/Booking/Booking';
import AboutUs from './pages/AboutUs/AboutUs';
import Footer from './components/Footer'; // Ensure correct import
import MyBooking from './pages/Booking/mybooking';
import Order from './pages/order';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/booking" element={<Booking />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/my-booking" element={<MyBooking />} />
                        </Routes>
                    </Container>
                </main>
                <Footer /> {/* Include the Footer component */}
            </div>
        </Router>
    );
}

export default App;
