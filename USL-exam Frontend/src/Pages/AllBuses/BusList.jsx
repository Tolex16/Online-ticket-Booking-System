import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import Styles from "./AllBuses.module.css";

const AllBuses = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/all-buses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBuses(response.data);
      } catch (err) {
        setError("Failed to fetch buses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBuses();
  }, []);

  return (
    <div className={Styles.container}>
      <h1>All Buses</h1>
      {isLoading && <p>Loading buses...</p>}
      {error && <p className={Styles.error}>{error}</p>}
      {!isLoading && !error && (
        <div className={Styles.busList}>
          {buses.map((bus) => (
            <div key={bus.id} className={Styles.busCard}>
              <h2>{bus.name}</h2>
              <p><strong>Route:</strong> {bus.route.start} to {bus.route.end}</p>
              <p><strong>Operator:</strong> {bus.driverName}</p>
              <p><strong>Contact:</strong> {bus.operator.contact}</p>
              <p><strong>Day of Operation:</strong> {bus.dayOfOperation}</p>
              <p><strong>Time:</strong> {bus.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBuses;
