import React, { useState } from 'react';
import axios from 'axios';
import Style from "./SearchRoutes.module.css";
import { BASE_URL } from "../../config";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const SearchRoutes = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();

    const searchRoutes = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }
    
        axios.get(`${BASE_URL}/passenger/routes/search?origin=${origin}&destination=${destination}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => setRoutes(response.data))
        .catch(err => console.error(err));
        console.log(routes)

    };
    
    const handleSelectRoute = (routeId) => {
        console.log(routeId)
        navigate(`/book-ticket/${routeId}`);
      };
    

    return (
        <>
        <Navbar />
        
        <div className={Style.container}>
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
            <button className={Style.send} onClick={searchRoutes}>Search</button>
            </div>

            {routes.length > 0 && (     
        <div className={Style.allRoutes}>
            <h3>Available Routes</h3>
            <ul>
                {routes.map(route => (
                    <div key={route.routeId} className={Style.allRoutes}>
                        <p><strong>Route:</strong>{route.origin} → {route.destination} ({route.departureDate})</p>
                        <p><strong>Price:</strong> ₦{route.price}</p>
                        <p><strong>Duration:</strong> {route.duration}</p>
                        <button className={Style.send} onClick={() => handleSelectRoute(route.routeId)}>
                  Select Route
                </button>
                    </div>
                ))}
            </ul>
        </div>
        )}
        <Footer/>
        </>
    );
    
};

export default SearchRoutes;
