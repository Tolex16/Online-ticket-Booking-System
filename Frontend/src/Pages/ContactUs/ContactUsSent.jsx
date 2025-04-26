import React from 'react'
import Style from "./Sent.module.css"
import { useNavigate } from "react-router-dom";

function ContactUsSent() {
  const navigate = useNavigate();
  
  const handleBack= async (e) => {
    e.preventDefault();

  
    try {
        navigate("/contactus");
      } catch (error) {
        console.log(error);
      }
    };

  return (
        <>
    
          <div className={Style.Sent}>
            <div>
            <h3>Message sent. We'll contact you soon</h3>

            <button className={Style.send} style={{color:"rgb(238, 226, 226)"}} type="submit" onClick={handleBack}>GO BACK</button>
            </div>
          
          </div>
          </>
  )
}

export default ContactUsSent
