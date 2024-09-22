import React from 'react';
import Slider from 'react-slick';
import '../styles/HeroSection.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your images
import image1 from '../assets/hackathon.png';
import image2 from '../assets/rrc.png';
import image3 from '../assets/phobe.png';
import image4 from '../assets/Rilo.png';
import image5 from '../assets/toprock.png';
import image6 from '../assets/toprock2.png';

const HeroSection = () => {
  const images = [image5, image3, image6, image4, image1, image2];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds per slide
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Hide arrows if you prefer
  };

  return (
    <div className="hero-section">
      <Slider {...settings} className="hero-carousel">
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
      {/* Add the overlay */}
      <div className="overlay"></div>
      <div className="hero-text">
        <h1>Vincent Cordova</h1>
        <h2>Software Developer</h2>
        <p>
            Welcome to my world! I'm an Undergraduate student at MSU Denver with a strong passion to act
            upon my curiosity and perpetual desire to learn. I enjoy many different subjects within Computer Science,
            and I'm always looking for ambitious projects to better my knowledge and development skills. Aside from my
            professional interests, I enjoy playing guitar, video games, making art, training muay thai,
            good conversations, and coding.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
