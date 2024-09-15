import React from 'react';
import { Link } from 'react-router-dom';
import Headshot from '../assets/headshot.png'; // Make sure you import your profile image

const BottomHalfCard = () => {
  return (
    <div style={styles.container}>
      {/* Left Half: Profile Info */}
      <div style={styles.leftSide}>
        <img src={Headshot} alt="Profile" style={styles.image} />
        <div style={styles.textContainer}>
          <h1 style={styles.name}>Vincent Cordova</h1>
          <h1 style={styles.title}>Software Developer</h1>
          <p style={styles.quote}>"You're only where you are in life when you are is you are."</p>
        </div>
      </div>

      {/* Right Half: Navigation Buttons */}
      <div style={styles.rightSide}>
        <Link to="/projects" style={styles.button}>Projects</Link>
        <Link to="/technologies" style={styles.button}>Technologies</Link>
        <Link to="/about" style={styles.button}>About Me</Link>
        <Link to="/contact" style={styles.button}>Contact</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    height: '50vh', // Takes up the bottom half of the screen
    display: 'flex',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    overflow: 'hidden',
  },
  leftSide: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
    padding: '20px',
  },
  textContainer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  image: {
    width: '40vw', // Make the image responsive to viewport width
    height: '40vw',
    maxWidth: '180px', // Set a max width for smaller devices
    maxHeight: '180px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '3px solid #fff',
  },
  name: {
    fontSize: '4.5vw', // Responsive font size
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  title: {
    fontSize: '3.5vw', // Responsive font size
    marginBottom: '10px',
  },
  quote: {
    fontSize: '3.5vw', // Responsive font size
    fontStyle: 'italic',
    textAlign: 'center',
  },
  rightSide: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2vh',
  },
  button: {
    width: '60%',
    padding: '1.5vh 0',
    textAlign: 'center',
    fontSize: '3.5vw', // Responsive font size
    backgroundColor: '#000',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '10px',
    border: '2px solid #fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default BottomHalfCard;
