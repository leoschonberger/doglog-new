// App.js
// Main application component with routing for different pages

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapPage from './pages/MapPage';
import Login from './components/Login';
import ActivityPage from './pages/ActivityPage';
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage component
import OnboardingPage from './pages/OnboardingPage';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* Add the profile route */}
          <Route path="/welcome" element={<OnboardingPage />} /> {/* Add the welcome route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
