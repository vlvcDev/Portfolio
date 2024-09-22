// ProjectsPage.jsx
import React, { useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: 'Roadrunner Connect',
    description:
      'A full stack app development internship at MSU Denver where we built a scalable, multi-feature application for student engagement.',
    shortDescription: 'A full stack app development internship at MSU Denver...',
    image: require('../assets/rrc.png'),
    date: '2023-08-01',
  },
  {
    id: 2,
    title: 'Undergraduate Research',
    description:
      'Exploring parallel programming by building and testing a Raspberry Pi Cluster to improve computation and learn parallelism in practice.',
    shortDescription: 'Exploring parallel programming by building and testing...',
    image: require('../assets/raspberryPi.png'),
    date: '2022-11-15',
  },
  {
    id: 3,
    title: 'SpiderByte',
    description:
      'A hackathon-winning website that aims to make practicing programming more fulfilling by offering coding challenges with unique rewards and achievements.',
    shortDescription: 'A hackathon-winning website that aims to make practicing...',
    image: require('../assets/hackathon.png'),
    date: '2023-06-10',
    github: 'https://github.com/yourusername/spiderbyte',
  },
];

const ProjectsPage = () => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  const calculateHeight = () => {
    const baseHeight = 30; // 30vh base for each project
    const additionalHeight = 20; // Additional 20vh for padding or spacing
    return `${projectsData.length * baseHeight + additionalHeight}vh`;
  };

  return (
    <div style={{ ...styles.pageContainer, minHeight: calculateHeight() }}>
      <h1 style={styles.pageTitle}>Projects</h1>
      <div style={styles.container}>
        {projectsData.map((project) => (
          <div
            key={project.id}
            style={styles.projectCard}
            onClick={() => toggleExpand(project.id)}
          >
            <div style={styles.imageContainer}>
              <img
                src={project.image}
                alt={project.title}
                style={styles.projectImage}
              />
              {/* GitHub Button below the image */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.githubButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>
              )}
            </div>
            <div style={styles.projectContent}>
              <h2 style={styles.projectTitle}>{project.title}</h2>
              <p style={styles.projectDate}>
                {new Date(project.date).toLocaleDateString()}
              </p>
              <p style={styles.projectDescription}>
                {expandedProjectId === project.id
                  ? project.description
                  : project.shortDescription}
              </p>
              {expandedProjectId !== project.id && (
                <span style={styles.readMore}>Read more...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100vw',
    backgroundColor: '#0a0a0a',
    paddingTop: '50px',
    paddingBottom: '100px',
    scrollbarWidth: 'none',
  },
  pageTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  projectCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #fff',
    backgroundColor: '#000',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '20px',
  },
  projectImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  githubButton: {
    padding: '8px 12px',
    backgroundColor: '#0a0a0a',
    textDecoration: 'none',
    borderRadius: '5px',
    border: '1px solid #fff',
    color: '#fff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  projectContent: {
    flex: 1,
  },
  projectTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  projectDate: {
    fontSize: '0.9rem',
    color: '#fff',
    marginBottom: '10px',
  },
  projectDescription: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  readMore: {
    color: '#007BFF',
    cursor: 'pointer',
  },
  '@media (max-width: 768px)': {
    projectCard: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    imageContainer: {
      alignItems: 'center',
      marginRight: '0',
      marginBottom: '15px',
    },
    projectImage: {
      width: '100%',
      height: '200px',
      marginBottom: '10px',
    },
    githubButton: {
      alignSelf: 'center',
    },
  },
};

export default ProjectsPage;
export { projectsData };
