import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Headshot from '../assets/headshot.png';

const HeroCard = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: '40vh', opacity: 1 },  // y is now relative to viewport height
      { y: '0vh', opacity: 1, duration: 2.2, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  return (
    <div ref={cardRef} style={styles.card}>
      <img
        src={Headshot} // Replace with your image URL or import the image
        alt="Profile"
        style={styles.image}
      />
      <h1 style={styles.name}>Vincent Cordova</h1>
      <h2 style={styles.title}>Software Developer</h2>
      <p style={styles.quote}>
        "You're only when your are in life when you are is you are."
      </p>
    </div>
  );
};

const styles = {
  card: {
    position: 'absolute',  // Change from 'fixed' to 'absolute'
    bottom: '0',
    left: '1vw',
    width: '10vw',  // Width is now relative to viewport width
    maxWidth: '25vw',  // Maximum width is now relative to viewport width
    height: '68vh',  // Height is now relative to viewport height
    padding: '5vw', // Padding is now relative to viewport width
    backgroundColor: '#0a0a0a',
    borderRadius: '0 3vw 0 0',  // Border radius is now relative to viewport width
    textAlign: 'center',
    color: '#fff',
  },
  image: {
    width: '10vw',  // Image width is now relative to viewport width
    height: '19vh',  // Image height is now relative to viewport width
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1vh',  // Margin bottom is now relative to viewport width
    border: '3px solid #fff',
  },
  name: {
    fontSize: '4vh',  // Font size is now relative to viewport width
    fontWeight: 'bold',
    marginBottom: '1vh',  // Margin bottom is now relative to viewport width
  },
  title: {
    fontSize: '3vh',  // Font size is now relative to viewport width
    fontStyle: 'italic',
    marginBottom: '4vh',  // Margin bottom is now relative to viewport width
  },
  quote: {
    fontSize: '2vh',  // Font size is now relative to viewport width
    lineHeight: '1.5',
    fontStyle: 'italic',
    marginBottom: '20vh',  // Margin bottom is now relative to viewport height
  },
};

export default HeroCard;
