import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Hero/Hero';
import Style from "./Home.module.css"
import Destinations from '../../Components/Locations/Destinations';
import Footer from '../../Components/Footer/Footer';
import BusCarousel from '../../Components/Buses/BusCarousel';
import { motion } from 'framer-motion';
import { useNavigate} from "react-router-dom";
import LoginModal from '../../Components/Modals/LoginModal';
import isAuthenticated from '../../Components/Authentication/IsAuthenticated';
import React, { useState} from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => setIsModalOpen(false);


  const busPopup = (e) => {
    e.preventDefault();
    isAuthenticated() ? handleAllBuses() : setIsModalOpen(true);
    
  };

  const routePopup = (e) => {
    e.preventDefault();
    isAuthenticated() ? handleAllRoutes() : setIsModalOpen(true);
    
  };
  
const handleAllRoutes = () => navigate("/all-routes");
const handleAllBuses = () => navigate("/all-buses");

  return(
    <motion.div
    
    initial={{width: 0}}
    animate={{width: "100%"}}
    exit={{x: window.innerWidth , transition:{ duration: 0.1 }}}
    >
    <Navbar/>
    <Hero/>
        <br/>
        <h2 className={Style.heading}> Discover NEW Landscapes </h2>
        <p className={Style.paragraph}> Transverse scenic routes</p>

        <Destinations/>
        <button className={Style.createaccount} onClick={routePopup}>View All Routes</button>
        <br/>
        <br/>
        <br/>

        <h2 className={Style.heading}> Our Buses </h2>
        
        <BusCarousel/>
        <br />
        <br />
        <br />
        <button className={Style.createaccount} onClick={busPopup}>View More</button>
        <br/>
        <br/>
        <br/>
        <Footer/>

        <LoginModal isOpen={isModalOpen} onClose={onClose} />
     </motion.div>
  )
}
export default Home; 