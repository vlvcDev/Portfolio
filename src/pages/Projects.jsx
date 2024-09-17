import React, { useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: 'Roadrunner Connect',
    description: 'A full stack app development internship at MSU Denver where we built a scalable, multi-feature application for student engagement.',
    shortDescription: 'A full stack app development internship at MSU Denver...',
    image: require('../assets/rrc.png'),
    date: '2023-08-01',
  },
  {
    id: 2,
    title: 'Undergraduate Research',
    description: 'Exploring parallel programming by building and testing a Raspberry Pi Cluster to improve computation and learn parallelism in practice.',
    shortDescription: 'Exploring parallel programming by building and testing...',
    image: require('../assets/raspberryPi.png'),
    date: '2022-11-15',
  },
  {
    id: 3,
    title: 'SpiderByte',
    description: 'A hackathon-winning website that aims to make practicing programming more fulfilling by offering coding challenges with unique rewards and achievements.',
    shortDescription: 'A hackathon-winning website that aims to make practicing...',
    image: require('../assets/hackathon.png'),
    date: '2023-06-10',
  },
];

const ProjectsPage = () => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Projects</h1>
      <div style={styles.container}>
        {projectsData.map((project) => (
          <div
            key={project.id}
            style={styles.projectCard}
            onClick={() => toggleExpand(project.id)}
          >
            <img src={project.image} alt={project.title} style={styles.projectImage} />
            <div style={styles.projectContent}>
              <h2 style={styles.projectTitle}>{project.title}</h2>
              <p style={styles.projectDate}>{new Date(project.date).toLocaleDateString()}</p>
              <p style={styles.projectDescription}>
                {expandedProjectId === project.id ? project.description : project.shortDescription}
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
      height: '100vh',
      backgroundColor: '#000', // Black background for the whole page
      paddingTop: '50px', // Add padding to give space between the title and top of the page
      paddingBottom: '100px',
      scrollbarWidth: 'none', // Hide scrollbar for aesthetic purposes
    },
    pageTitle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: '3rem',
      fontWeight: 'bold',
      margin: '20px 0', // Space below the title to push down the content
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
      border: '2px solid #fff', // White outline
      backgroundColor: '#000', // Black card background
      color: '#fff', // White text
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    projectImage: {
      width: '150px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginRight: '20px',
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
      },
      projectImage: {
        width: '100%',
        height: '200px',
        marginBottom: '15px',
      },
    },
  };
  

export default ProjectsPage;
