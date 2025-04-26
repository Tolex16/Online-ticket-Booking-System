import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from "../../config";

const OperatorsByRoute = ({ routeId }) => {
    const [operators, setOperators] = useState([]);

    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token from localStorage
                const response = await axios.get(`${BASE_URL}/passenger/all-buses-route/${routeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the Authorization header
                    },
                });
                setOperators(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOperators();
    }, [routeId]); // Re-run when routeId changes

    return (
        <div>
            <h1>Operators for Route</h1>
            <ul>
                {operators.map(operator => (
                    <li key={operator.operatorId}>
                        <p><strong>Name:</strong> {operator.driverName}</p>
                        <p><strong>Contact:</strong> {operator.phoneNumber}</p>
                        <p><strong>Seating Capacity:</strong> {operator.seating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OperatorsByRoute;
