import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import Styles from "./PassengerTickets.module.css";

const PassengerTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/passenger/all-tickets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTickets(response.data);
      } catch (err) {
        setError("Failed to fetch tickets. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, []);

      // Cancel a ticket
      const cancelTicket = (id) => {
        axios.delete(`/passenger/cancel-ticket/${id}`)
            .then(() => {
                setTickets(tickets.filter(ticket => ticket.id !== id));
                alert('Ticket canceled successfully.');
            })
            .catch(err => alert('Failed to cancel ticket. Please try again.'));
    };

  return (
    <div className={Styles.container}>
      <h1>My Tickets</h1>
      {isLoading && <p>Loading tickets...</p>}
      {error && <p className={Styles.error}>{error}</p>}
      {!isLoading && !error && (
        <div className={Styles.ticketList}>
          {tickets.map((ticket) => (
            <div key={ticket.id} className={Styles.ticketCard}>
              <h2>Ticket ID: {ticket.id}</h2>
              <p><strong>Passenger Name:</strong> {ticket.passengerName}</p>
              <p><strong>Driver Name:</strong> {ticket.driverName}</p>
              <p><strong>Estimated Duration:</strong> {ticket.estimatedDuration}</p>
              <p><strong>Booking Date and Time:</strong> {ticket.bookingDateTime}</p>
              <p><strong>Route:</strong> {ticket.origin} - {ticket.destination}</p>
              <p><strong>Seat Number:</strong> {ticket.seatNumber}</p>
              <p><strong>Price:</strong> {ticket.price}</p>
              <p><strong>Departure Date:</strong> {ticket.departureDay}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
             {ticket.status !== 'CANCELLED' && (
              <button onClick={() => cancelTicket(ticket.id)}>Cancel Ticket</button>
            )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PassengerTickets;
