import React, { useState, useEffect } from 'react';
import './Services.css'; // Import custom CSS for Services page

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.PUBLIC_URL + '/servicesData.json');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="services-header">
                <h1>Our Services</h1>
                <p>Check out our range of premium auto grooming services</p>
            </div>
            <div className="services-container">
                {services.map((service, index) => (
                    <div key={index} className="service-item" style={{ backgroundImage: `url(images/${service.images[0]})` }}>
                        <div className="service-details">
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <div className="features-pricing">
                                <div className="service-features">
                                    <h4>Features:</h4>
                                    <ul>
                                        {service.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="service-prices">
                                    <h4>Pricing:</h4>
                                    <ul>
                                        {Object.entries(service.prices).map(([carType, price]) => (
                                            <li key={carType}>{carType}: <p>{price}</p></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="service-availability">
                                <h4>Availability:</h4>
                                <ul>
                                    {service.availability.map((day, idx) => (
                                        <li key={idx}>{day}</li>
                                    ))}
                                </ul>
                            </div> */}
                            <div className="service-availability">
                                <h4>Availability:</h4>
                                <p>We are available from sunday to saturday, 8AM to 8PM</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
