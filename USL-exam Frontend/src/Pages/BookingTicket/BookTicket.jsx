import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Styles from "./BookTicket.module.css";
import { BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookTicket = () => {
  const [ticketDetails, setTicketDetails] = useState({
    routeId: "",
    dateOfTravel: "",
    numberOfTickets: 1,
    passengerName: "",
    email: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Function to validate form fields
  const validateFields = () => {
    const errors = {};
    if (!ticketDetails.routeId.trim()) errors.routeId = "Route ID is required.";
    if (!ticketDetails.dateOfTravel.trim()) errors.dateOfTravel = "Travel date is required.";
    if (!ticketDetails.passengerName.trim()) errors.passengerName = "Passenger name is required.";
    if (!ticketDetails.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(ticketDetails.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!ticketDetails.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(ticketDetails.phoneNumber)) {
      errors.phoneNumber = "Enter a valid phone number (10-15 digits).";
    }
    if (ticketDetails.numberOfTickets <= 0) {
      errors.numberOfTickets = "Number of tickets must be at least 1.";
    }
    return errors;
  };

  // Function to submit ticket booking details to the backend
  const handleBookTicket = async () => {
    const errors = validateFields();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return; // Stop if there are validation errors

    setIsLoading(true);
    setError("");
    try {
      await axios.post(
        `${BASE_URL}/tickets/book`,
        ticketDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Ticket booked successfully!");
      // Clear the form after success
      setTicketDetails({
        routeId: "",
        dateOfTravel: "",
        numberOfTickets: 1,
        passengerName: "",
        email: "",
        phoneNumber: "",
      });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        setError("Invalid token. Please log in again.");
      } else {
        toast.error("Failed to book ticket. Please try again later.");
        setError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear validation error for the field being edited
    }));
  };

  return (
    <>
      <Navbar />
      <h1 className={Styles.title}>Book Your Ticket</h1>
      <div className={`${Styles.container} ${Styles.formCenter}`}>
        {isLoading && <p>Booking your ticket, please wait...</p>}
        {error && <p className={Styles.error}>{error}</p>}

        <form className={Styles.form}>
          <div>
            <label>Route ID</label>
            <input
              type="text"
              name="routeId"
              value={ticketDetails.routeId}
              onChange={handleChange}
              aria-label="Route ID"
            />
            {validationErrors.routeId && (
              <p className={Styles.error}>{validationErrors.routeId}</p>
            )}

            <label>Date of Travel</label>
            <input
              type="date"
              name="dateOfTravel"
              value={ticketDetails.dateOfTravel}
              onChange={handleChange}
              aria-label="Date of Travel"
            />
            {validationErrors.dateOfTravel && (
              <p className={Styles.error}>{validationErrors.dateOfTravel}</p>
            )}

            <label>Number of Tickets</label>
            <input
              type="number"
              name="numberOfTickets"
              value={ticketDetails.numberOfTickets}
              onChange={handleChange}
              min="1"
              aria-label="Number of Tickets"
            />
            {validationErrors.numberOfTickets && (
              <p className={Styles.error}>{validationErrors.numberOfTickets}</p>
            )}

            <label>Passenger Name</label>
            <input
              type="text"
              name="passengerName"
              value={ticketDetails.passengerName}
              onChange={handleChange}
              aria-label="Passenger Name"
            />
            {validationErrors.passengerName && (
              <p className={Styles.error}>{validationErrors.passengerName}</p>
            )}

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={ticketDetails.email}
              onChange={handleChange}
              aria-label="Email"
            />
            {validationErrors.email && (
              <p className={Styles.error}>{validationErrors.email}</p>
            )}

            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={ticketDetails.phoneNumber}
              onChange={handleChange}
              aria-label="Phone Number"
            />
            {validationErrors.phoneNumber && (
              <p className={Styles.error}>{validationErrors.phoneNumber}</p>
            )}
          </div>
        </form>

        <div className={Styles.buttonContainer}>
          <button onClick={handleBookTicket} className={Styles.bookButton}>
            Book Ticket
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookTicket;
