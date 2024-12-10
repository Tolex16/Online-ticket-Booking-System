import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Style from './ContactUs.module.css';
import ContactHero from '../../Components/Hero/ContactHero';
import Instagram from '@mui/icons-material/Instagram';
import { motion } from 'framer-motion';
import { BASE_URL } from '../../config';
import axios from 'axios';

const ContactUs = ({ cartItems }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });

  const handleContactUs = async (e) => {
    e.preventDefault();

    // Form validation
    if (!contact.name || !contact.email || !contact.message) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/users/contactus`, contact, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setIsMessageSent(true);
        setContact({ name: '', email: '', message: '' }); // Reset form
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Navbar cartItems={cartItems} />
      <ContactHero />

      <div className={Style.hear}>
        <h1>We would love to hear from you.</h1>
        <p>
          If you have any query or any type of suggestion, you can contact us here. <br />
          We would love to hear from you.
        </p>
      </div>

      <div className={Style.form}>
        <form onSubmit={handleContactUs}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            placeholder="Enter your name"
            aria-label="Name"
            className={Style.input}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Enter your email"
            aria-label="Email"
            className={Style.input}
          />

          <label>Message</label>
          <br />
          <textarea
            name="message"
            value={contact.message}
            onChange={handleChange}
            placeholder="Enter your message"
            aria-label="Message"
            className={Style.textarea}
          />

          <button
            type="submit"
            className={Style.send}
            disabled={loading}
          >
            {loading ? 'Sending......' : 'SEND MESSAGE'}
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={Style.error}
            >
              {error}
            </motion.p>
          )}
          {isMessageSent && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={Style.success}
            >
              Thank you for your message! We’ll get back to you soon.
            </motion.p>
          )}
        </form>

        <div className={Style.touch}>
          <h1>Get in touch with us</h1>
          <h6>
            You can get in touch with us on Instagram.
            <br />
            <Instagram sx={{ paddingTop: '10px', marginBottom: '-5.9px' }} /> @Ticket.go
          </h6>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default ContactUs;
