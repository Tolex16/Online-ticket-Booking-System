import React, { useState, useEffect } from "react";
import Style from "./Hero.module.css";
import Slide1 from "../../Assets/Hero.jpg";
import Slide2 from "../../Assets/Hero2.jpg";
import Slide3 from "../../Assets/Hero3.jpg";
import Slide4 from "../../Assets/Hero4.jpg";
import Slide5 from "../../Assets/Hero5.jpg";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of imported images
  const images = [Slide1, Slide2, Slide3, Slide4,Slide5];

  // Automatic slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds per image
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={Style.heroSlider}>
      {/* Image Slider */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`${Style.image} ${
            index === currentIndex ? Style.active : ""
          }`}
        />
      ))}

      {/* Slide Indicators */}
      <div className={Style.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${Style.indicator} ${
              index === currentIndex ? Style.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
