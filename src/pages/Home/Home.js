import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css'; // Adjust the path to your CSS file if necessary
import bgImage from '../../images/bg.jpeg'; // Import your background image
import slide1 from '../../images/slide1.jpg'; // Import your slider images
import slide2 from '../../images/slide2.jpg';
import slide3 from '../../images/slide3.jpg';
import slide4 from '../../images/slide4.jpg';
import slide5 from '../../images/slide5.jpg';
import slide6 from '../../images/slide6.jpg';

const Home = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true); // State to manage automatic slider
    const [data, setData] = useState({ featuredServices: [], promotions: [] });

    const handleBookingClick = () => {
        navigate('/booking');
    }
    const handleServicesClick = () => {
        navigate('/services');
    }
    
    // Slider functionality
    const slides = [slide1, slide2, slide3, slide4, slide5, slide6];

    useEffect(() => {
        let interval;
        if (autoSlide) {
            interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            }, 3000); // Change every 3 seconds
        }

        return () => clearInterval(interval);
    }, [autoSlide, slides.length]);

    const nextSlide = () => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

    const prevSlide = () => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);

    const goToSlide = (index) => setCurrentSlide(index);

    const toggleAutoSlide = () => setAutoSlide((prevAutoSlide) => !prevAutoSlide);

    // Fetch JSON data
    useEffect(() => {
        fetch('/home.json')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div>
            <section className="promotions-section">
                {data.promotions.map((promotion, index) => (
                    <div key={index} className="promotion-card">
                        <h3>{promotion.title}</h3>
                        <p>{promotion.Description}</p>
                    </div>
                ))}
            </section>
            <div className="home-container" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="hero-section">
                    <h1>Welcome to Bop Auto Grooming</h1>
                    <div className="button-container">
                        <button onClick={handleBookingClick} className="btn btn-primary">Booking</button>
                        <button onClick={handleServicesClick} className="btn btn-secondary">Services</button>
                    </div>
                </div>
            </div>

            <section className="featured-services-section">
                <h1>Featured Services</h1>
                <div className="featured-services">
                    {data.featuredServices.map((service, index) => (
                        <div key={index} className="service-card">
                            <img src={service.image} alt={service.name} className="service-image" />
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="slider-section">
                <h1>Explore Our Services</h1>
                <div className="slider">
                    <button className="arrow arrow-left" onClick={prevSlide}>❮</button>
                    <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <div key={index} className="slide" style={{ backgroundImage: `url(${slide})` }}></div>
                        ))}
                    </div>
                    <button className="arrow arrow-right" onClick={nextSlide}>❯</button>
                </div>
                
                <div className="nav-dots">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
                <button className="btn pause-play-button" onClick={toggleAutoSlide}>
                    {autoSlide ? 'Pause' : 'Play'}
                </button>
            </section>





        </div>
    );
};

export default Home;
