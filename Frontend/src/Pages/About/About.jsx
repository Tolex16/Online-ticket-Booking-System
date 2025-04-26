import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import AboutHero from '../../Components/Hero/About Hero';
import { motion } from 'framer-motion';
import Style from './AboutHero.module.css';
import TicketBookingImage1 from "../../Assets/Lagos.jpg"
import TicketBookingImage2 from "../../Assets/Cross rivers.jpg"
import TicketBookingImage3 from "../../Assets/Abuja.jpg"
import { useInView } from "react-intersection-observer"

const About = () => {
    const [refIntro, inViewIntro] = useInView({ triggerOnce: true });
    const [refQuality, inViewQuality] = useInView({ triggerOnce: true });
    const [refPromise, inViewPromise] = useInView({ triggerOnce: true });

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            // initial={{ opacity: 0, y: 50 }}
            // animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            exit={{ x: window.innerWidth, transition: { duration: 1 } }}
        >
            <Navbar />
            <AboutHero />

            <div className={Style.contentContainer}>
    <section ref={refIntro} className={Style.intro}>
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={inViewIntro ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 2 }}
        >    
            <div>
                <img className={Style.image} src={TicketBookingImage1} alt="logo" />
            </div>
        </motion.div>
        <div className={Style.introSection}>
            <h2 className={Style.heading}>Your Journey, Your Convenience</h2>
            <p className={Style.paragraph}>
                At **FastTicket**, we are committed to making your travel planning seamless and stress-free. 
                Our platform offers a user-friendly interface to book tickets effortlessly, whether you're planning a quick getaway 
                or a long-awaited trip. We prioritize your convenience, ensuring that every journey starts and ends with ease.
            </p>
        </div>
    </section>

    <section ref={refQuality} className={Style.quality}>
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inViewQuality ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 2 }}
        >
            <div className={Style.qualitySection}>
                <h2 className={Style.heading}>Unmatched Service and Reliability</h2>
                <p className={Style.paragraph}>
                    At **FastTicket**, we pride ourselves on providing a reliable service you can count on. 
                    From secure payment options to real-time booking confirmations, our platform is designed to prioritize your needs. 
                    With a focus on accuracy and transparency, we ensure every booking experience exceeds expectations.
                </p>
            </div>
        </motion.div>
        <div>
            <img className={Style.middleImage} src={TicketBookingImage2} alt="logo" />
        </div>
    </section>

    <section ref={refPromise} className={Style.promise}>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inViewPromise ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2 }}
        >
            <div>
                <img className={Style.image} src={TicketBookingImage3} alt="logo" />
            </div>
        </motion.div>   
        <div className={Style.promiseSection}>
            <h2 className={Style.heading}>Our Promise to You</h2>
            <p className={Style.paragraph}>
                At **FastTicket**, we promise to deliver an exceptional booking experience. 
                Whether it’s finding the best routes or ensuring you receive instant updates, 
                our goal is to make your travel effortless and enjoyable. Trust us to be your travel partner, 
                committed to getting you where you need to go, hassle-free.
            </p>
        </div>
    </section>
</div>

            <Footer />
        </motion.div>
    );
}

export default About;
