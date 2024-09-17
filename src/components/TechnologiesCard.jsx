import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaGitAlt, FaDocker, FaJava } from 'react-icons/fa'; 
import { SiJavascript, SiCplusplus, SiFigma, SiPostman } from 'react-icons/si';

const TechnologiesCard = () => {
  const cardRef = useRef(null);

  const categories = ['Languages', 'Frameworks', 'Tools'];
  const technologies = {
    Languages: [
      { id: 1, name: 'Python', icon: <FaPython style={{ color: '#306998' }} /> }, // Python blue
      { id: 2, name: 'Java', icon: <FaJava style={{ color: '#b07219' }} /> }, // Java brown
      { id: 3, name: 'Dart', icon: <SiCplusplus style={{ color: '#00B4AB' }} /> }, // Dart teal
      { id: 4, name: 'JavaScript', icon: <SiJavascript style={{ color: '#F0DB4F' }} /> }, // JS yellow
      { id: 5, name: 'C++', icon: <SiCplusplus style={{ color: '#00599C' }} /> }, // C++ blue
      { id: 6, name: 'ARM Assembly', icon: <SiCplusplus style={{ color: '#00599C' }} /> }, // Placeholder color
      { id: 7, name: 'HTML', icon: <FaHtml5 style={{ color: '#E34C26' }} /> }, // HTML orange
    ],
    Frameworks: [
      { id: 8, name: 'React', icon: <FaReact style={{ color: '#61DBFB' }} /> }, // React cyan
      { id: 9, name: 'Node.js', icon: <FaNodeJs style={{ color: '#68A063' }} /> }, // Node.js green
      { id: 10, name: 'CSS', icon: <FaCss3Alt style={{ color: '#264de4' }} /> }, // CSS blue
    ],
    Tools: [
      { id: 11, name: 'Git', icon: <FaGitAlt style={{ color: '#F1502F' }} /> }, // Git red
      { id: 12, name: 'Docker', icon: <FaDocker style={{ color: '#0db7ed' }} /> }, // Docker blue
      { id: 13, name: 'Figma', icon: <SiFigma style={{ color: '#F24E1E' }} /> }, // Figma orange-red
      { id: 14, name: 'Postman', icon: <SiPostman style={{ color: '#FF6C37' }} /> }, // Postman orange
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState('Languages');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Card entrance animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: '32vh', opacity: 1 }, // Start below the view
      { y: '0vh', opacity: 1, duration: 1.8, ease: 'power4.out', delay: 0.6 }
    );
  }, []);

  const handleNextCategory = () => {
    const nextIndex = (currentCategoryIndex + 1) % categories.length;
    setSelectedCategory(categories[nextIndex]);
    setCurrentCategoryIndex(nextIndex);
  };

  const handlePrevCategory = () => {
    const prevIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
    setSelectedCategory(categories[prevIndex]);
    setCurrentCategoryIndex(prevIndex);
  };

  return (
    <div ref={cardRef} style={styles.card}>
      {/* Technologies Button */}
      <button
        style={styles.titleButton}
        onClick={() => window.location.href = '/technologies'}
      >
        Skillset
      </button>

      <div style={styles.categoryContainer}>
        {/* Left Arrow Button */}
        <button style={styles.leftArrowButton} onClick={handlePrevCategory}>
          ◀
        </button>

        {/* Category Name */}
        <div style={styles.categoryWrapper}>
          <span style={styles.categoryName}>{selectedCategory}</span>
        </div>

        {/* Right Arrow Button */}
        <button style={styles.rightArrowButton} onClick={handleNextCategory}>
          ▶
        </button>
      </div>

      {/* Display Technologies based on the selected category */}
      <div style={styles.listContainer}>
        {technologies[selectedCategory].map((tech) => (
          <div key={tech.id} style={styles.techItem}>
            <span style={styles.techIcon}>{tech.icon}</span>
            <span style={styles.techName}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '18vw',
    height: '56vh',
    backgroundColor: '#0a0a0a',
    borderRadius: '0 3vw 0 0',
    padding: '2vh 2vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    overflow: 'hidden',
    position: 'absolute',
    bottom: '0vw',
    left: '42vw',
  },
  titleButton: {
    display: 'inline-block',
    padding: '1vw 2vh',
    backgroundColor: '#000',
    fontSize: '2vh',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    border: '1px solid #fff',
    marginBottom: '3vh',
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2vh',
    width: '100%', // Ensure the arrows and category fit within the same width
  },
  categoryWrapper: {
    flex: 1, // This will take up the space between the arrows
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrowButton: {
    backgroundColor: '#0a0a0a',
    color: '#fff',
    fontSize: '2.5vh',
    padding: '1vh 2vh',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
  },
  rightArrowButton: {
    backgroundColor: '#0a0a0a',
    color: '#fff',
    fontSize: '2.5vh',
    padding: '1vh 2vh',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
  },
  categoryName: {
    fontSize: '2.5vh',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80%',
    overflowY: 'auto',
    padding: '1vh',
    // Hide scrollbar
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // Internet Explorer & Edge
  },
  'listContainer::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari, etc.
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5vh',
    width: '100%',
    padding: '0.5vh 0',
  },
  techIcon: {
    fontSize: '3vh', // Adjust size of the icon
    marginRight: '1vw',
  },
  techName: {
    fontSize: '1.8vh',
  },
};

export default TechnologiesCard;
