import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SendAgain = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
  
    const handleRedo = async (e) => {
      e.preventDefault();
      try {
        navigate("/");
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };
  return (
    <div>
       <button onClick={handleRedo} type="submit">Send again</button>
       {error && <p>Error in Network</p>}
    </div>
  )
}

export default SendAgain
