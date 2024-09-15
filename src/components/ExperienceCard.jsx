import React, { useState } from 'react';

const ExperienceCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('Proficient');

  const skills = {
    Proficient: [
      { name: 'JavaScript', icon: '🟨' }, 
      { name: 'React', icon: '⚛️' }, 
      { name: 'Node.js', icon: '🟩' },
      { name: 'HTML', icon: '📄' },
      { name: 'CSS', icon: '🎨' },
      { name: 'Python', icon: '🐍' },
      { name: 'Git', icon: '🔧' },
      { name: 'MongoDB', icon: '🍃' }
    ],
    Known: [
      { name: 'TypeScript', icon: '🔷' }, 
      { name: 'Express.js', icon: '🚂' },
      { name: 'SQL', icon: '🗃️' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Docker', icon: '🐳' },
      { name: 'AWS', icon: '☁️' },
      { name: 'GraphQL', icon: '🔗' },
      { name: 'Kubernetes', icon: '🚢' }
    ],
    Learning: [
      { name: 'Rust', icon: '🦀' }, 
      { name: 'Go', icon: '💨' },
      { name: 'Three.js', icon: '🔺' },
      { name: 'TensorFlow', icon: '🔍' },
      { name: 'Elixir', icon: '🧪' },
      { name: 'Unity', icon: '🎮' },
      { name: 'Deno', icon: '🦕' },
      { name: 'Haskell', icon: 'λ' }
    ]
  };

  return (
    <div style={styles.experienceCard}>
      <h2 style={styles.experienceTitle}>Experience</h2>
      <div style={styles.experienceButtons}>
        {['Proficient', 'Known', 'Learning'].map((category) => (
          <button
            key={category}
            style={{
              ...styles.experienceButton,
              ...(selectedCategory === category ? styles.activeButton : {})
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div style={styles.experienceGrid}>
        {skills[selectedCategory].map((skill, index) => (
          <div key={index} style={styles.experienceSkill}>
            <div style={styles.skillIcon}>{skill.icon}</div>
            <div style={styles.skillName}>{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  experienceCard: {
    position: 'fixed',
    backgroundColor: '#000',
    borderRadius: '2vw',
    padding: '4vw',
    color: '#fff',
    textAlign: 'center',
    maxWidth: '16vw',
    margin: '0 auto',
  },
  experienceTitle: {
    fontSize: '2vw',
    marginBottom: '1vh',
  },
  experienceButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '1vh',
  },
  experienceButton: {
    backgroundColor: '#444',
    border: 'none',
    color: '#fff',
    padding: '1vw 2vw',
    borderRadius: '1vw',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '2vw',
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  experienceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2vh',
  },
  experienceSkill: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '2vw',
  },
  skillIcon: {
    fontSize: '3vw',
    marginBottom: '1vh',
  },
  skillName: {
    fontSize: '2vw',
    textAlign: 'center',
  },
};

export default ExperienceCard;
