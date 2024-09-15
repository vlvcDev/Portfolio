import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AboutMeCard = () => {
  const cardRef = useRef(null); // Ref for the card animation

  // Animation for AboutMeCard
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: '32vh', opacity: 0.0 },  // Start animation from below
      { y: '0vh', opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.8 } // Animate to its position
    );
  }, []);

  return (
    <div ref={cardRef} style={styles.card}>
      <div style={styles.content}>
        <h2 style={styles.title}>About Me</h2>
        <p style={styles.description}>I'm a Computer Science undergraduate student</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '32vw',
    height: '39vh',
    backgroundColor: '#0a0a0a',
    borderRadius: '0 3vw 0 0',
    padding: '2vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    position: 'absolute',
    bottom: '0',
    left: '62vw',
    overflow: 'hidden',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '4vh',
    marginBottom: '0vh',
  },
  description: {
    fontSize: '2vh',
    marginBottom: '2vh',
  },
};

export default AboutMeCard;
