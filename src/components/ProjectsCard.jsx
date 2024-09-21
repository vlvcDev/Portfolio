import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { projectsData } from '../pages/Projects.jsx';

const ProjectsCard = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const cardRef = useRef(null); // Reference for the card

  const projects = projectsData;

  // Animation for ProjectsCard
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: '32vh', opacity: 1 },  // Start animation from below
      { y: '0vh', opacity: 1, duration: 2.0, ease: 'power4.out', delay: 0.4 } // Animate to its position
    );
  }, []);

  const handleNext = () => {
    gsap.fromTo(
      '.project-card-content',
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
    );
    setCurrentProject((prevProject) =>
      prevProject === projects.length - 1 ? 0 : prevProject + 1
    );
  };

  const handlePrev = () => {
    gsap.fromTo(
      '.project-card-content',
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
    );
    setCurrentProject((prevProject) =>
      prevProject === 0 ? projects.length - 1 : prevProject - 1
    );
  };

  return (
    <div ref={cardRef} style={styles.card}> {/* Attach ref to the card */}
      <div className="project-card-content" style={styles.content}>
        <img
          src={projects[currentProject].image}
          alt={projects[currentProject].title}
          style={styles.image}
        />
        <h2 style={styles.title}>{projects[currentProject].title}</h2>
        <p style={styles.description}>{projects[currentProject].shortDescription}</p>
        <a href={'/projects'} style={styles.viewButton}>
          Projects
        </a>
      </div>
      <div style={styles.controls}>
        <button onClick={handlePrev} style={styles.controlButton}>◀</button>
        <button onClick={handleNext} style={styles.controlButton}>▶</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '18vw',
    maxWidth: '600px',
    height: '62vh',
    backgroundColor: '#0a0a0a',
    borderRadius: '0 3vw 0 0',
    padding: '2vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    position: 'absolute',
    bottom: '2vw',
    left: '21vw',
    overflow: 'hidden',
  },
  content: {
    textAlign: 'center',
  },
  image: {
    width: '20vw',
    height: '35vh',
    borderRadius: '10px',
    marginBottom: '0vh',
    objectFit: 'cover',
  },
  title: {
    fontSize: '4vh',
    marginBottom: '0vh',
  },
  description: {
    fontSize: '2vh',
    marginBottom: '2vh',
  },
  viewButton: {
    display: 'inline-block',
    fontSize: '2vh',
    padding: '1vw 2vh',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    border: '1px solid #fff',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: '2vh',
  },
  controlButton: {
    backgroundColor: '#0a0a0a',
    width: '4vw',
    color: '#fff',
    border: 'none',
    padding: '1vw',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '2.5vh',
  },
};

export default ProjectsCard;
