import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import MyBookingCard from './mybookingCard';

const MyBooking = () => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/getBookingFromEmailAndNumber', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, number }),
            });
            const data = await response.json();
            if (response.ok) {
                setBooking(data);
                setError(null);
            } else {
                setBooking(null);
                setError(data.message);
            }
        } catch (error) {
            setBooking(null);
            setError(error.message);
        }
    };

    return (
        <>
        {
            !booking ? (
                <Container className='d-flex justify-content-center align-items-center'>
                <Card style={{ width: '20rem', padding: '1rem', backgroundColor: '#f8f9fa' }}>
                    <Card.Body>
                        <Card.Title>My Booking</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='email' style={{ marginBottom: '1rem' }}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='number' style={{ marginBottom: '1rem' }}>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter phone number'
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' style={{ backgroundColor: '#007bff' }}>
                                Submit
                            </Button>
                        </Form>
                        {error && <Alert variant='danger' style={{ marginTop: '1rem' }}>{error}</Alert>}
                        {booking && (
                            <Card style={{ marginTop: '1rem' }}>
                                <Card.Body>
                                    <Card.Title>Booking Details</Card.Title>
                                    <Card.Text>
                                        <strong>Name:</strong> {booking.name}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Email:</strong> {booking.email}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Phone Number:</strong> {booking.number}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Service:</strong> {booking.service}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Date:</strong> {booking.date}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Time:</strong> {booking.time}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Card.Body>
                </Card>
            </Container>
            ):
            (
                <MyBookingCard booking={booking}  />
            )
        }
        </>
    );
};

export default MyBooking;
