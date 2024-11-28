// App.js
// Main application component with routing for different pages

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapPage from './pages/MapPage';
import Login from './components/Login';
import ActivityPage from './pages/ActivityPage';
import { AuthProvider } from './components/AuthContext';
import AchievementPage from './components/AchievementPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/ach" element={<AchievementPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
