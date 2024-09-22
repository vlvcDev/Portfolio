import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from 'react-icons/fa';

const WorkExperience = () => {
  const experiences = [
    {
      company: 'Roadrunner Connect',
      role: 'Full Stack App Developer',
      duration: 'Jun 2024 - Aug 2024',
      description: 'Worked on the development of an app in part of MSU Denver\'s 2024 strategic plan. I mainly focused on the parsing of event data from existing calendar sources, and displaying events on a cross-platform mobile application map view. I used technologies such as spaCy, Google Maps API, Flutter, MongoDB, NodeJS, and more.',
    },
    {
      company: 'MSU Denver',
      role: 'Undergraduate Researcher',
      duration: 'Apr 2023 - Apr 2024',
      description: 'Built in tested a Raspberry Pi Cluster to improve computation and learn parallelism in practice. The research started as the testing of a Raspberry Pi running the same program in different languages and comparing their completion times. For this, I wrote benchmarking code in ARM Assembly, Java, and Python and observed their differences as languages, such as time taken in overhead computing. When more funding was obtained, I pivoted the project into building and testing a Raspberry Pi cluster to explore the ups and downs of parallelization using message passing. For my testing I used Python, Java, MPI, and Linux shell scripts.',
    },
    {
      company: 'MSU Denver',
      role: 'Teaching Assistant',
      duration: 'Aug 2024 - Dec 2024',
      description: 'Assisted in the teaching of the Computer Science 1 course at MSU Denver. I held office hours, graded assignments, and helped students with their programming projects. I also held review sessions before exams and helped students understand the fundamentals of Computer Science.',
    },
    {
      company: 'MSU Denver',
      role: 'Learning Assistant',
      duration: 'Jug 2023 - Jun 2024',
      description: 'Attended Computer Organization 2 classes to assist students with lab assignments, answer questions about abstract concepts, and help students write ARM Assembly code. I held office hours and review sessions to better the understanding of the course material for exams and coding projects.',
    },
    {
      company: 'Freelance',
      role: '3D Game Asset Modeler',
      duration: '2020 - 2022',
      description: 'Worked as a freelance 3D modeler for Beat Saber custom sabers. I created custom 3D models in Blender and applied materials and effects to them in Unity. I also created custom animations for the sabers, and did bulk commissions for the USA Beat Saber team.',
    }
    // Add more experiences as needed
  ];

  return (
    <div className="work-experience">
      <h1>Professional Experience</h1>
      <VerticalTimeline>
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            date={exp.duration}
            iconStyle={{ background: '#0a0a0a', color: '#fff' }}
            icon={<FaBriefcase />}
          >
            <h3>{exp.role}</h3>
            <h4>{exp.company}</h4>
            <p>{exp.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default WorkExperience;
