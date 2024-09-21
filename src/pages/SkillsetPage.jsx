// SkillsetPage.jsx
import React, { useRef, useEffect } from 'react';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaGitAlt,
  FaDatabase,
  FaCss3Alt,
  FaJsSquare,
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiDocker, SiJest, SiGraphql, SiFirebase } from 'react-icons/si';
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
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
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

    useEffect(() => {
      const cards = carouselRef.current.querySelectorAll('.skill-card');

      cards.forEach((card) => {
        // 3D Tilt Effect on Hover
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Micro-Interaction: Icon Spin on Hover
        const icon = card.querySelector('.skill-icon');
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { rotation: 360, duration: 1, ease: 'elastic.out(1, 0.3)' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.set(icon, { rotation: 0 });
        });
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener('mousemove', handleTilt);
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }, []);

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

    const handleMouseLeave = (e) => {
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

  // Custom Cursor State
  const cursorRef = useRef(null);

  useEffect(() => {


    return () => {
    };
  }, []);

  return (
    <div className="skillset-page">
      {/* Animated Background */}
      <div className="animated-background"></div>

      {/* Your Skill Carousels */}
      <SkillCarousel title="Languages" skills={skillsData.languages} />
      <SkillCarousel title="Frameworks" skills={skillsData.frameworks} />
      <SkillCarousel title="APIs" skills={skillsData.apis} />
      <SkillCarousel title="Devtools" skills={skillsData.devtools} />
    </div>
  );
};

export default SkillsetPage;
