import Style from "./Footer.module.css";
import React from 'react';
import TextField from '@mui/material/TextField';
import Instagram from '@mui/icons-material/Instagram';
import { Mail, Phone, Twitter, WhatsApp } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import logo from "../../Assets/logo.png"

const Footer = () => {

  return (
    <div>
      <section className={Style.footer}>
        <div className={Style.container}>
          <img className={Style.logo} src={logo} alt="logo" />
          <h2 className={Style.title}> Plan Your Journey <br /> Join Our Community</h2>
          <p className={Style.paragraph}>
          At **FastTicket**, we are committed to simplifying your travel experience. 
    Whether you're planning a business trip, a vacation, or just a quick getaway, 
    our platform is designed to make booking tickets seamless and hassle-free. 
    Join our community and explore a smarter way to travel.    
     </p>
                    <p className={Style.options}><Phone/> +2349031650479</p>
                    <p className={Style.options}><Mail/>  support@fastticket.com</p>
        </div>
        <div className={Style.section}>
     <h3>EXPLORE</h3>
    <ul>
    <li>About Us</li>
    <li>Contact</li>
    <li>Travel Guides</li>
    <li>FAQs</li>
    <li>Terms and Conditions</li>
        </ul>
      </div>
        <div className={Style.join}>
          <div>
            <h3 className={Style.news}>Stay Updated</h3>
            <p className={Style.description}>
            Be the first to know about our latest promotions, new routes, and updates to our services. 
            Subscribe to our newsletter and never miss an opportunity to save on your next journey!
            </p>
          </div>
          <div className={Style.newsletterForm}>
            
          <TextField
      className={Style.input}
      label="Enter Your Email Address"
      variant="standard"
      InputLabelProps={{
        style: { color: '#ffff' }, // Color of the label
      }}
      InputProps={{
        sx: {
          '&:before': {
            borderBottomColor: '#ffff', // Color of the bottom border before focus
            borderBottomWidth: '2px', // Width of the bottom border
            borderBottomStyle: 'solid',
          },
          '&:after': {
            borderBottomColor: '#ffff', // Color of the bottom border after focus
            borderBottomWidth: '2px', // Width of the bottom border
            borderBottomStyle: 'solid',
          },
          '&:hover:before': {
            borderBottomColor: '#ffff', // Color of the bottom border on hover before focus
            borderBottomWidth: '2px', // Width of the bottom border
            borderBottomStyle: 'solid',
          },
          background: 'transparent', // Remove background color
          border: 'none', // Remove border
        },
      }}
      sx={{
        input: {
          background: 'transparent', // Remove background color
          border: 'none', // Remove border
        },
        '& .MuiInput-underline:before': { borderBottomColor: '#ffff' },
        '& .MuiInput-underline:after': { borderBottomColor: '#ffff' },
        '& .MuiInput-underline:hover:before': { borderBottomColor: '#ffff' },
      }}
    />
        <button className={Style.send} type="submit">Join</button>
     </div>
          <div className={Style.socialIcons}>
          <Link to={"https://www.instagram.com/"}>
          <Instagram className={Style.icon} />
          </Link>
            {/* <Payment className={Style.icon} /> */}
            <WhatsApp className={Style.icon}/>
            <Twitter className={Style.icon} />
          </div>
        </div>


      </section>
          </div>
  );
};

export default Footer;
