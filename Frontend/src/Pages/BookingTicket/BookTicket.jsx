import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Styles from "./BookTicket.module.css";
import { BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

const BookTicket = () => {
  const { routeId } = useParams(); // Get the routeId from the URL
  const [buses, setBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // Function to validate form fields
  const validateFields = () => {
    const errors = {};
 if (!seatNumber.trim()) errors.seatNumber = "Seat Number is required.";

    return errors;
  };

  useEffect(() => {
    const fetchBusesForRoute = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/passenger/get-operators-route/${routeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBusesForRoute();
  }, [routeId]);

  // Function to submit ticket booking details to the backend
  const handleTicketBooking = async () => {
    const errors = validateFields();
    if (Object.keys(errors).length > 0) return; // Stop if there are validation errors

    if (!selectedBusId || !seatNumber) {
      alert('Please select a bus and provide a seat number.');
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/passenger/book-ticket`,
        { busId: Number(selectedBusId), 
          seatNumber: seatNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      if (response.status === 201) {
        toast.success("Ticket booked successfully!");
        navigate("/my-tickets")
      }

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        setError("");
      } else {
        toast.error("Failed to book ticket. Please try again later.");
        setError("");
        console.error('Error booking ticket:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className={Styles.title}>Book Ticket</h1>
      <div className={Styles.container}>
        {isLoading && <p>Booking your ticket, please wait...</p>}
        {error && <p className={Styles.error}>{error}</p>}

        <form >
          <div className={Styles.form}>
          <label>Operator:</label>
            <select
              value={selectedBusId}
              onChange={(e) => setSelectedBusId(e.target.value)}
            >
              <option value="">-- Select a Bus --</option>
              {buses.map((bus) => (
                <option key={bus.busId} value={bus.busId}>
                  {bus.driverName} - {bus.busModel}
                </option>
              ))}
            </select>

            <label>Seat Number:</label>
            <input
              type="number"
              name="seatNumber"
              placeholder="Enter preferred seat number"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              min="1"
              aria-label="Seat Number"
            />
            {error && (
              <p className={Styles.error}></p>
            )}

          </div>
        </form>

        <div className={Styles.buttonContainer}>
          <button disabled={isLoading} onClick={handleTicketBooking} className={Styles.bookButton}>
            {isLoading ? "Booking" : "Book Ticket"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookTicket;
