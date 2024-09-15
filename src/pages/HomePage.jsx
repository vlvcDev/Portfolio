import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import FluidSimulation from '../components/FluidShader';
import HeroCard from '../components/HeroCard';
import ProjectsCard from '../components/ProjectsCard';
import TechnologiesCard from '../components/TechnologiesCard';
import AboutMeCard from '../components/AboutMe';
import BottomHalfCard from '../components/MobileHomeCard';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isLandscapeView, setIsLandscapeView] = useState(false);

  // Function to handle window resizing and check aspect ratio
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setIsLandscapeView(width >= height); // Check if the aspect ratio is landscape or square
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on page load

    // GSAP Animations
    gsap.fromTo(
      ".name",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );
    gsap.fromTo(
      ".title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 1 }
    );
    gsap.fromTo(
      ".tagline",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 1.5 }
    );

    return () => window.removeEventListener('resize', handleResize); // Cleanup event listener on unmount
  }, []);

  return (
    <div className="homepage-container" style={styles.homepageContainer}>
      <div className="shader-wrapper" style={styles.shaderWrapper}>
        <FluidSimulation />
      </div>

      {/* Conditionally render based on aspect ratio */}
      {!isLandscapeView ? (
        <BottomHalfCard /> // Show the BottomHalfCard when width < height (portrait or square)
      ) : (
        <>
          <AboutMeCard />
          <TechnologiesCard />
          <ProjectsCard />
          <HeroCard />
        </>
      )}
    </div>
  );
};

const styles = {
  homepageContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0a0a0a', // Black background for the entire page
  },
  shaderWrapper: {
    width: '92%', // Container width (adjust as needed)
    height: '92%', // Container height (adjust as needed)
    backgroundColor: 'transparent', // Transparent background for the container
    borderRadius: '20px', // Rounded corners
    overflow: 'hidden', // Ensure content inside the container is clipped
    position: 'fixed',
    top: '50',
    left: '5',
    right: '5',
  },
};

export default HomePage;
