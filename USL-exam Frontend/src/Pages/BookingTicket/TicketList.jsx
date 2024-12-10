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
        const response = await axios.get(`${BASE_URL}/passengers/tickets`, {
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

  return (
    <div className={Styles.container}>
      <h1>Your Tickets</h1>
      {isLoading && <p>Loading tickets...</p>}
      {error && <p className={Styles.error}>{error}</p>}
      {!isLoading && !error && (
        <div className={Styles.ticketList}>
          {tickets.map((ticket) => (
            <div key={ticket.id} className={Styles.ticketCard}>
              <h2>Ticket ID: {ticket.id}</h2>
              <p><strong>Bus:</strong> {ticket.bus.name}</p>
              <p><strong>Route:</strong> {ticket.bus.route.start} to {ticket.bus.route.end}</p>
              <p><strong>Date:</strong> {ticket.dateOfTravel}</p>
              <p><strong>Seats:</strong> {ticket.numberOfSeats}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PassengerTickets;
