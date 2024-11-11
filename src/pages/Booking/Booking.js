import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SummaryView from "./SummaryView";
import "./Booking.css"; // Import custom CSS for Services page

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    date: "",
    time: "",
    vehicleType: "",
    serviceType: "",
    rego: "", // New field for Registration Number
  });

  const [servicesData, setServicesData] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isDateValid, setIsDateValid] = useState(false);

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "vehicleType" || name === "serviceType") {
      const selectedService = servicesData.find(
        (service) =>
          service.name ===
          (name === "serviceType" ? value : formData.serviceType)
      );
      const selectedVehicleType =
        name === "vehicleType" ? value : formData.vehicleType;

      if (selectedService && selectedVehicleType) {
        const price = selectedService.prices[selectedVehicleType] || "$0";
        setTotalPrice(price);
      }
    }
    if (name === 'date') {
        // Update available times based on selected date
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
        setAvailableTimes(availableTimes);
        setFormData(prevFormData => ({
            ...prevFormData,
            time: ''
        }));
        setIsDateValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSummary(true); // Show the summary view on submit
  };

  const handleConfirm = async () => {
    let bookingData = { ...formData, price: totalPrice.slice(1) };
    console.log("Sending booking data:", bookingData); // Log the data

    try {
      const response1 = await fetch(
        "http://localhost:5000/api/is-booking-possible",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await response1.json();
      console.log("Server response:", data);
      if (!response1.ok) {
        alert("Booking not possible: " + data.message);
        return;
      }
      if (!data.isPossible) {
        alert("Booking not possible: Slot already booked");
        return;
      }
    } catch (error) {
      console.error("Error checking booking:", error);
      alert("Error checking booking");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      console.log("Server response:", data); // Log server response
      if (response.ok) {
        localStorage.setItem("bookingId", data._id);
        alert("Thank u for booking");
        // Optionally, you can reset the form or navigate the user to another page
        setShowSummary(false);
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          date: "",
          time: "",
          vehicleType: "",
          serviceType: "",
          rego: "",
        });
        setTotalPrice("");
      } else {
        alert("Failed to confirm booking: " + data.message);
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Error confirming booking");
    }
  };

  return (
    <div className="booking-container">
      {!showSummary ? (
        <div>
          <h1>Booking</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                as="select"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                disabled={!formData.date}
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
                value={formData.vehicleType}
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
                value={formData.serviceType}
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
              <Form.Label>Registration Number (Rego)</Form.Label>
              <Form.Control
                type="text"
                name="rego"
                value={formData.rego}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Submit button */}
            <Button type="submit" variant="primary">
              Book Now
            </Button>
          </Form>
        </div>
      ) : (
        <SummaryView
          formData={formData}
          servicePrice={totalPrice}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default BookingForm;
