// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Navbar from './components/Navbar';
import Roadmap from './pages/Roadmap.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap" element={<Roadmap />} />
        {/* Add more routes here for additional pages */}
      </Routes>
    </Router>
  );
}

export default App;
