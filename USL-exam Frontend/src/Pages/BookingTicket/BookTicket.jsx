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
    busId: "",
    seatNumber: "",

  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Function to validate form fields
  const validateFields = () => {
    const errors = {};
    if (!ticketDetails.busId.trim()) errors.busId = "Bus ID is required.";
    if (!ticketDetails.seatNumber.trim()) errors.seatNumber = "Seat Number is required.";

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
        `${BASE_URL}/passenger/book-ticket`,
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
        seatNumber: ""
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
      <div className={Styles.container}>
        {isLoading && <p>Booking your ticket, please wait...</p>}
        {error && <p className={Styles.error}>{error}</p>}

        <form className={Styles.form}>
          <div>
            <label>Bus ID:</label>
            <input
              type="number"
              name="busId"
              value={ticketDetails.busId}
              onChange={handleChange}
              aria-label="Bus ID"
            />
            {validationErrors.busId && (
              <p className={Styles.error}>{validationErrors.busId}</p>
            )}

            <label>Seat Number:</label>
            <input
              type="number"
              name="seatNumber"
              value={ticketDetails.seatNumber}
              onChange={handleChange}
              min="1"
              aria-label="Number of Tickets"
            />
            {validationErrors.numberOfTickets && (
              <p className={Styles.error}>{validationErrors.numberOfTickets}</p>
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
