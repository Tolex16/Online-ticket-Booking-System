import React, { useState } from 'react';
import axios from 'axios';
import Style from "./SearchRoutes.module.css";
import { BASE_URL } from "../../config";

const SearchRoutes = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [routes, setRoutes] = useState([]);

    const searchRoutes = () => {
        axios.get(`${BASE_URL}/passenger/routes/search?origin=${origin}&destination=${destination}`)
            .then(response => setRoutes(response.data))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Search Routes</h1>
            <input
                type="text"
                placeholder="Origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
            />
            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <button onClick={searchRoutes}>Search</button>

            <ul>
                {routes.map(route => (
                    <li key={route.routeId}>
                        <p><strong>Route:</strong> {route.origin} to {route.destination}</p>
                        <p><strong>Price:</strong> N{route.price}</p>
                        <p><strong>Duration:</strong> {route.duration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchRoutes;
