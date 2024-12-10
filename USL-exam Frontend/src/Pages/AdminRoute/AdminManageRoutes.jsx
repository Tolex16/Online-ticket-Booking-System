import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Styles from './AdminManageRoutes.module.css';
import { useNavigate } from 'react-router-dom';
import { AddSharp } from '@mui/icons-material';
import axios from 'axios';
import { BASE_URL } from '../../config';

function AdminManageRoutes() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [routeDetails, setRouteDetails] = useState({
    startLocation: '',
    endLocation: '',
    dayOfOperation: '',
    time: '',
    busName: '',
    operatorName: '',
    contact: '',
  });

  const handleRouteSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('routeDetails', JSON.stringify(routeDetails));

      const response = await axios.post(`${BASE_URL}/admin/routes/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        navigate('/admin/dashboard');
      } else {
        setError('Failed to create or update route. Please try again.');
      }
    } catch (err) {
      setError('Error occurred while processing your request.');
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className={Styles.container}>
        <form onSubmit={handleRouteSubmit} className={Styles.form}>
          <h1 style={{ textAlign: 'center' }}>Manage Routes & Buses</h1>

          <label>Start Location:</label>
          <input
            type="text"
            name="startLocation"
            value={routeDetails.startLocation}
            onChange={handleChange}
            placeholder="Enter Start Location"
            required
          />

          <label>End Location:</label>
          <input
            type="text"
            name="endLocation"
            value={routeDetails.endLocation}
            onChange={handleChange}
            placeholder="Enter End Location"
            required
          />

          <label>Day of Operation:</label>
          <input
            type="text"
            name="dayOfOperation"
            value={routeDetails.dayOfOperation}
            onChange={handleChange}
            placeholder="Enter Day of Operation"
            required
          />

          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={routeDetails.time}
            onChange={handleChange}
            required
          />

          <label>Bus Name:</label>
          <input
            type="text"
            name="busName"
            value={routeDetails.busName}
            onChange={handleChange}
            placeholder="Enter Bus Name"
            required
          />

          <label>Operator Name:</label>
          <input
            type="text"
            name="operatorName"
            value={routeDetails.operatorName}
            onChange={handleChange}
            placeholder="Enter Operator Name"
            required
          />

          <label>Operator Contact:</label>
          <input
            type="text"
            name="contact"
            value={routeDetails.contact}
            onChange={handleChange}
            placeholder="Enter Operator Contact"
            required
          />

          <label>Bus Image:</label>
          <input type="file" onChange={handleFileChange} />

          <button className={Styles.submit} type="submit">
            Submit <AddSharp />
          </button>

          {error && <p className={Styles.error}>{error}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AdminManageRoutes;
