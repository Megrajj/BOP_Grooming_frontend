import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';

const MyBookingCard = (props) => {
    const [myBooking, setMyBooking] = useState(props.booking);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBooking, setUpdatedBooking] = useState(props.booking);
    const [unavailableSlots, setUnavailableSlots] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");
    const [servicesData, setServicesData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/servicesDataT.json");
                const data = await response.json();
                setServicesData(data.services);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUnavailableSlots = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/unavailableSlots"); // Adjust this URL as needed
                const data = await response.json();
                setUnavailableSlots(data);
            } catch (error) {
                console.error("Error fetching unavailable slots:", error);
            }
        };

        fetchUnavailableSlots();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "vehicleType" || name === "serviceType") {
            const selectedService = servicesData.find(
                (service) =>
                    service.name ===
                    (name === "serviceType" ? value : updatedBooking.serviceType)
            );
            const selectedVehicleType =
                name === "vehicleType" ? value : updatedBooking.vehicleType;

            if (selectedService && selectedVehicleType) {
                const price = selectedService.prices[selectedVehicleType] || "0";
                setTotalPrice(price.slice(1));
            }

        }
        if (name === "date") {
            let selectedDate = new Date(value);

            const unavailableTimesForDate = unavailableSlots.filter(slot => {
                const slotDate = new Date(slot.date);
                return slotDate.toDateString() === selectedDate.toDateString();
            })
            const unavailableTimesArray = unavailableTimesForDate.map(slot => slot.time);
            const allTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
            const availableTimes = allTimes.filter(time => {
                return !unavailableTimesArray.includes(time)
            });
            
            if(selectedDate.toDateString() == new Date(myBooking.date).toDateString()){
                availableTimes.push(myBooking.time)
            }
            setAvailableTimes(availableTimes);
        }
        setUpdatedBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));

    };
    useEffect(() => {
        setUpdatedBooking((prevBooking) => ({
            ...prevBooking,
            price: totalPrice
        }));
    }, [totalPrice])

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${myBooking._id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log("Server response:", data);
            if (response.ok) {
                alert("Booking deleted successfully!");
            } else {
                alert("Failed to delete booking: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
        // reload window
        window.location.reload();
        localStorage.removeItem('bookingId');
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${myBooking._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBooking),
            });
            const data = await response.json();
            console.log("Server response:", data);
            if (response.ok) {
                setMyBooking(data);
                setIsEditing(false);
                alert("Booking updated successfully!");
            } else {
                alert("Failed to update booking: " + data.message);
            }
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("Error updating booking");
        }
    };

    const toogleEditing = () => {
        setIsEditing(!isEditing);
        setTotalPrice(myBooking.price);
        let selectedDate = new Date(updatedBooking.date);

        const unavailableTimesForDate = unavailableSlots.filter(slot => {
            const slotDate = new Date(slot.date);
            return slotDate.toDateString() === selectedDate.toDateString();
        })
        const unavailableTimesArray = unavailableTimesForDate.map(slot => slot.time);
        const allTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
        const availableTimes = allTimes.filter(time => {
            return !unavailableTimesArray.includes(time)
        });
        if(selectedDate.toDateString() == new Date(myBooking.date).toDateString()){
            availableTimes.push(myBooking.time)
        }
        availableTimes.sort()
        setAvailableTimes(availableTimes);
    }

    return (
        <Container>
            <h1 className="my-4">My Booking</h1>
            {myBooking ? (
                <Card className="mb-4">
                    <Card.Header>
                        <h2>Booking Details</h2>
                    </Card.Header>
                    <Card.Body>
                        {isEditing ? (
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={updatedBooking.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={updatedBooking.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phoneNumber"
                                        value={updatedBooking.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={new Date(updatedBooking.date).toISOString().split('T')[0]}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="time">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="time"
                                        value={updatedBooking.time}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Time</option>
                                        {availableTimes.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="vehicleType">
                                    <Form.Label>Vehicle Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="vehicleType"
                                        value={updatedBooking.vehicleType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Vehicle Type</option>
                                        {servicesData.length > 0 &&
                                            Object.keys(servicesData[0].prices).map((vehicleType) => (
                                                <option key={vehicleType} value={vehicleType}>
                                                    {vehicleType}
                                                </option>
                                            ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="serviceType">
                                    <Form.Label>Service Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="serviceType"
                                        value={updatedBooking.serviceType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Service Type</option>
                                        {servicesData.map((service) => (
                                            <option key={service.name} value={service.name}>
                                                {service.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="rego">
                                    <Form.Label>Rego</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="rego"
                                        value={updatedBooking.rego}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <p>${totalPrice}</p>
                                <Button variant="primary" onClick={handleUpdate}>
                                    Update Booking
                                </Button>
                                <Button variant="secondary" className="ml-2" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </Form>
                        ) : (
                            <div>
                                <p><strong>Name:</strong> {myBooking.name}</p>
                                <p><strong>Email:</strong> {myBooking.email}</p>
                                <p><strong>Phone Number:</strong> {myBooking.phoneNumber}</p>
                                <p><strong>Date:</strong> {myBooking.date}</p>
                                <p><strong>Time:</strong> {myBooking.time}</p>
                                <p><strong>Vehicle Type:</strong> {myBooking.vehicleType}</p>
                                <p><strong>Service Type:</strong> {myBooking.serviceType}</p>
                                <p><strong>Rego:</strong> {myBooking.rego}</p>
                                <p><strong>Total Price:</strong> {myBooking.price}</p>
                                <Button variant="warning" onClick={() => toogleEditing()}>
                                    Edit Booking
                                </Button>
                                {/* make deletebutton */}
                                <Button variant="danger" className="ml-2" onClick={handleDelete}>
                                    Delete Booking
                                </Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            ) : (
                <Alert variant="info">No booking found</Alert>
            )}
        </Container>
    );
};

export default MyBookingCard;
