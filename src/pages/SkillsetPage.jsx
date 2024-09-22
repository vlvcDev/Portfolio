// SkillsetPage.jsx
import React, { useRef, useEffect } from 'react';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaGitAlt,
  FaDatabase,
  FaJsSquare,
  FaJava,
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiDocker, SiJest, SiGraphql, SiFirebase, SiCplusplus, SiC, SiDart, SiArm } from 'react-icons/si';
import { gsap } from 'gsap';
import '../styles/SkillsetPage.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsetPage = () => {
  // Define your skill data
  const skillsData = {
    languages: [
      { name: 'JavaScript', icon: <FaJsSquare /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'Java', icon: <FaJava />},
      { name: 'C++', icon: <SiCplusplus />},
      { name: 'C', icon: <SiC />},
      { name: 'Dart', icon: <SiDart />},
      { name: 'ARM Assembly', icon: <SiArm />},
      { name: 'HTML/CSS', icon: <FaHtml5 /> },
    ],
    frameworks: [
      { name: 'React', icon: <FaReact /> },
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
    ],
    apis: [
      { name: 'REST', icon: <FaDatabase /> },
      { name: 'GraphQL', icon: <SiGraphql /> },
      { name: 'Firebase', icon: <SiFirebase /> },
    ],
    devtools: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Jest', icon: <SiJest /> },
    ],
  };
  const SkillCarousel = ({ title, skills }) => {
    const carouselRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
  
    useEffect(() => {
      const carousel = carouselRef.current;
      const cards = carousel.querySelectorAll('.skill-card');
  
      // Drag-to-scroll functionality
      carousel.addEventListener('mousedown', handleMouseDown);
      carousel.addEventListener('mouseleave', handleMouseLeave);
      carousel.addEventListener('mouseup', handleMouseUp);
      carousel.addEventListener('mousemove', handleMouseMove);
  
      cards.forEach((card) => {
        // 3D Tilt Effect on Hover
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeaveCard);
  
        // Micro-Interaction: Icon Spin on Hover
        const icon = card.querySelector('.skill-icon');
        <div className="skill-icon" style={{ color: skills.color }}>
          {skills.icon}
        </div>
      
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { rotation: 15, duration: 0.2, ease: 'expo.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.set(icon, { rotation: 0 });
        });
      });
  
      return () => {
        carousel.removeEventListener('mousedown', handleMouseDown);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
        carousel.removeEventListener('mouseup', handleMouseUp);
        carousel.removeEventListener('mousemove', handleMouseMove);
  
        cards.forEach((card) => {
          card.removeEventListener('mousemove', handleTilt);
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeaveCard);
        });
      };
    },);
  
    const handleMouseDown = (e) => {
      e.preventDefault();
      isDown.current = true;
      carouselRef.current.classList.add('dragging');
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    };
  
    const handleMouseLeave = () => {
      isDown.current = false;
      carouselRef.current.classList.remove('dragging');
    };
  
    const handleMouseUp = () => {
      isDown.current = false;
      carouselRef.current.classList.remove('dragging');
    };
  
    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX.current) * 1; // Multiply by a factor for speed
      carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };
  
    const handleTilt = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: (x / rect.width) * 15,
        rotationX: -(y / rect.height) * 15,
        ease: 'power1.out',
      });
    };
  
    const handleMouseEnter = (e) => {
      gsap.to(e.currentTarget, { willChange: 'transform' });
    };
  
    const handleMouseLeaveCard = (e) => {
      gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, ease: 'power1.out' });
    };
  
    return (
      <div className="carousel-container">
        <h2 className="carousel-title">{title}</h2>
        <div className="carousel" ref={carouselRef}>
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{skill.icon}</div>
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <div className="skillset-page">
      <div className="skillset-header">
        <p>Explore the technologies I have had experience with</p>
      </div>

      <SkillCarousel title="Languages" skills={skillsData.languages} />
      <SkillCarousel title="Frameworks" skills={skillsData.frameworks} />
      <SkillCarousel title="APIs" skills={skillsData.apis} />
      <SkillCarousel title="Devtools" skills={skillsData.devtools} />
    </div>
  );
};

export default SkillsetPage;
