import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from "../../config";

const OperatorsByRoute = ({ routeId }) => {
    const [operators, setOperators] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/passenger/bus-route/${routeId}`)
            .then(response => setOperators(response.data))
            .catch(err => console.error(err));
    }, [routeId]);

    return (
        <div>
            <h1>Operators for Route</h1>
            <ul>
                {operators.map(operator => (
                    <li key={operator.operatorId}>
                        <p><strong>Name:</strong> {operator.name}</p>
                        <p><strong>Seating Capacity:</strong> {operator.seating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OperatorsByRoute;
