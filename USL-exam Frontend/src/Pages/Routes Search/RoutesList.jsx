import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import Styles from "./AllRoutes.module.css";

const RoutesList = () => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/passenger/all-routes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRoutes(response.data);
      } catch (err) {
        setError("Failed to fetch buses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  return (
    <div className={Styles.container}>
      <h1>All Routes</h1>
      {isLoading && <p>Loading routes....</p>}
      {error && <p className={Styles.error}>{error}</p>}
      {!isLoading && !error && (
        <div className={Styles.busList}>
          {routes.map((route) => (
            <div key={route.routeId} className={Styles.busCard}>
              <p><strong>Route:</strong> {route.origin} to {route.destination}</p>
              <p><strong>Departure Date:</strong> {route.departureDate}</p>
              <p><strong>Departure Time:</strong> {route.departureTime}</p>
              <p><strong>Duration:</strong> {route.duration}</p>
              <p><strong>Price:</strong> ₦{route.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoutesList;
