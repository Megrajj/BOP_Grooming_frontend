import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

const Admin = () => {
    const [bookings, setBookings] = React.useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/bookings"); // Adjust this URL as needed
                const data = await response.json();
                setBookings(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    },[])

    return (
<>
<h1>Bookings Lists</h1>
{bookings.length > 0 ? (
    <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Vehicle Type</th>
                    <th>Service Type</th>
                    <th>Registration</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking._id}>
                        <td>{booking.name}</td>
                        <td>{booking.email}</td>
                        <td>{booking.phoneNumber}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td>{booking.vehicleType}</td>
                        <td>{booking.serviceType}</td>
                        <td>{booking.rego}</td>
                        <td>{booking.price}</td>
                    </tr>
                ))}
            </tbody>
        </Table>

): (
    <h4>No Bookings Found</h4>
)
}
</>
    );
};

export default Admin;