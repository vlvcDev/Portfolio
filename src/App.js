// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/Projects.jsx';
import SkillsetPage from './pages/SkillsetPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Cursor from './components/Cursor.jsx';

function App() {
  
  return (
    <Router>
      <Cursor />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skillset" element={<SkillsetPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Add more routes here for additional pages */}
      </Routes>
    </Router>
  );
}

export default App;
