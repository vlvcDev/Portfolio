import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { FaGithub, FaLinkedin, FaHome, FaBars, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

gsap.registerPlugin(TextPlugin);

const Navbar = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const hoverInTimeline = useRef(null);
  const hoverOutTimeline = useRef(null);

  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For the dropdown menu on desktop view

  // Function to handle window resizing
  const handleResize = () => {
    if (window.innerWidth <= 760) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
      setIsMenuOpen(false); // Close the menu when switching back to desktop view
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial window size

    gsap.set(leftButtonRef.current, { x: '-100%', opacity: 0 });
    gsap.set(rightButtonRef.current, { x: '100%', opacity: 0 });

    gsap.fromTo(
      containerRef.current,
      { y: '-100%', opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' }
    );

    const expandedText = 'VINCENT LEE VAI CORDOVA';
    const originalText = 'VLVC';

    gsap.set(textRef.current, { text: expandedText });
    const fullNameWidth = textRef.current.scrollWidth;

    gsap.set(textRef.current, { text: originalText });
    const originalWidth = textRef.current.scrollWidth;

    hoverInTimeline.current = gsap
      .timeline({ paused: true })
      .to(containerRef.current, { width: fullNameWidth, duration: 0.5, ease: 'power1.out' })
      .to(textRef.current, { text: expandedText, duration: 1, ease: 'power1.inOut', stagger: 0.05 }, '-=0.5');

    hoverOutTimeline.current = gsap
      .timeline({ paused: true, reversed: true })
      .to(textRef.current, { text: originalText, duration: 1, ease: 'power1.inOut', stagger: -0.05 })
      .to(containerRef.current, { width: originalWidth, duration: 0.5, ease: 'power1.in' }, '-=1.0');

    gsap.to(leftButtonRef.current, {
      x: '0%',
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.to(rightButtonRef.current, {
      x: '0%',
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => {
    hoverOutTimeline.current.pause();
    hoverInTimeline.current.play();
  };

  const handleMouseLeave = () => {
    hoverInTimeline.current.reverse();
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown menu
  };

  return (
    <>
      {!isMobileView && (
        <div style={styles.dropdownWrapper}>
          <FaEnvelope size={'4vh'} style={styles.dropdownIcon} onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div style={styles.dropdownMenu}>
              <p>Contact Info:</p>
              <a href="mailto:vlvc.dev@gmail.com" style={styles.contactLink}>vlvc.dev@gmail.com</a>
              <a href="https://linkedin.com/in/vlvcDev" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                <FaLinkedin /> LinkedIn
              </a>
              <a href="https://github.com/vlvcDev" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                <FaGithub /> GitHub
              </a>
            </div>
          )}
        </div>
      )}
      {/* Home button, only visible on non-mobile view */}
      {!isMobileView && (
        <Link to="/" style={styles.homeButton}>
          <FaHome size={'4vh'} /> {/* Home icon */}
        </Link>
      )}

      {!isMobileView ? (
        <nav style={styles.navbar}>
          <div style={styles.buttonGroup}>
            <a href="https://linkedin.com/in/vlvcDev" target="_blank" rel="noopener noreferrer" style={styles.buttonLink}>
              <div style={styles.button}>
                <FaLinkedin size={'4vh'} /> {/* LinkedIn icon */}
              </div>
            </a>
            <div ref={leftButtonRef} style={styles.button}>
              Projects
            </div>
            <div ref={containerRef} style={styles.textContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <span ref={textRef} style={styles.text}>
                VLVC
              </span>
            </div>
            <div ref={rightButtonRef} style={styles.button}>
              Skillset
            </div>
            <a href="https://github.com/vlvcDev" target="_blank" rel="noopener noreferrer" style={styles.buttonLink}>
              <div style={styles.button}>
                <FaGithub size={'4vh'} /> {/* GitHub icon */}
              </div>
            </a>

            {/* Dropdown Button on the top-right corner of the screen */}
          </div>
        </nav>
      ) : (
        <>
          {/* Hamburger menu for mobile view */}
          <button style={styles.hamburgerButton} onClick={toggleMobileMenu}>
            <FaBars size={'4vh'} />
          </button>

          {isMenuOpen && (
            <div style={styles.mobileMenu}>
              <Link to="/" style={styles.mobileMenuItem}>Home</Link>
              <Link to="/projects" style={styles.mobileMenuItem}>Projects</Link>
              <Link to="/technologies" style={styles.mobileMenuItem}>Technologies</Link>
              <Link to="/about" style={styles.mobileMenuItem}>About</Link>
              <div style={styles.contactInfo}>
                <p>Contact Info:</p>
                <a href="mailto:vlvc@example.com" style={styles.contactLink}>vlvc@example.com</a>
                <a href="https://linkedin.com/in/vlvcDev" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                  <FaLinkedin /> LinkedIn
                </a>
                <a href="https://github.com/vlvcDev" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: '5.6vh',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    padding: '0 10px',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  button: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: '2.6vh',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  buttonLink: {
    textDecoration: 'none',
  },
  textContainer: {
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    padding: '1.5vh 1vw',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  text: {
    color: '#000',
    fontSize: '4vh',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  homeButton: {
    position: 'fixed',
    top: '2vh',
    left: '2vw',
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: '3vh',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2000, // Higher z-index to ensure it is on top of other content
  },
  // Hamburger button
  hamburgerButton: {
    display: 'block',
    position: 'fixed',
    top: '2vh',
    right: '2vw',
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2001,
  },
  dropdownWrapper: {
    position: 'fixed',
    top: '2vh',
    right: '2vw',
    zIndex: 2001,
  },
  dropdownIcon: {
    cursor: 'pointer',
    color: '#ffffff',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '4vh',
    right: 0,
    backgroundColor: '#0a0a0a',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 2001,
  },
  contactLink: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '10px',
  },
  mobileMenu: {
    position: 'fixed',
    top: '5.6vh',
    left: 0,
    width: '100vw',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    zIndex: 1000,
  },
  mobileMenuItem: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '3vh',
    margin: '10px 0',
    cursor: 'pointer',
  },
  contactInfo: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#fff',
  },
};

export default Navbar;
