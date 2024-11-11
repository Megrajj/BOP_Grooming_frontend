import React from 'react';
import { Button } from 'react-bootstrap';

const SummaryView = ({ formData, servicePrice, onConfirm }) => {
    const { name, email, phoneNumber, date, time, vehicleType, serviceType, rego } = formData;

    return (
        <div className="summary-view">
            <h1>Booking Summary</h1>
            <div className="summary-details" style={{textAlign:"left"}}>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone Number:</strong> {phoneNumber}</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>Vehicle Type:</strong> {vehicleType}</p>
                <p><strong>Service Type:</strong> {serviceType}</p>
                <p><strong>Registration Number (Rego):</strong> {rego}</p>
                <p><strong>Total Price:</strong> {servicePrice}</p>
            </div>
            <Button variant="primary" onClick={onConfirm}>Confirm Booking</Button>
        </div>
    );
};

export default SummaryView;
