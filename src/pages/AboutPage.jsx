import React from 'react';
import HeroSection from '../components/HeroSection';
import WorkExperience from '../components/WorkExperience';
import Game from '../components/Game';

const AboutPage = () => {
  return (
    <div>
      <HeroSection />
      <WorkExperience />
      <div className="game-section">
        <h2>Fun Game</h2>
        <Game />
      </div>
    </div>
  );
};

export default AboutPage;
