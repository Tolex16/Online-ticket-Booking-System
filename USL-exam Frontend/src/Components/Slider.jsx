import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Slider = ({ children }) => {
  const [xPos, setXPos] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const childrenRef = useRef(children);

  const transitionDuration = 0.5; // in seconds
  const intervalDuration = 3; // in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextSlideIndex = (slideIndex + 1) % React.Children.count(childrenRef.current);
      setSlideIndex(nextSlideIndex);
      setXPos(-nextSlideIndex * 100); // Assuming each slide takes 100% width
    }, intervalDuration * 1000);

    return () => clearInterval(intervalId);
  }, [slideIndex]);

  // Convert children to an array if it's not already one
  const childrenArray = React.Children.toArray(childrenRef.current);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <motion.div
        animate={{ x: xPos }}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        style={{
          width: `${childrenArray.length * 100}%`,
          display: 'flex',
        }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="box">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slider;