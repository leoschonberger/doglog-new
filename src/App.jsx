// App.js
// Main application component with routing for different pages

/*
 * This file represents the heart of our web app. It contains the main App component which is a wrapper for all of the other components in the app. It also contains the routing logic for the different pages in the app.
 * 
 * Group Name: Doo Doo Data
 * 
 * Authors:
 * - Leo Schonberger
 * 
 * Component: App
 * Description: We chose to keep the nav bar at the top of our app at all times. Other components are rendered based on the current route. We use the React Router to handle the routing logic. The App component is wrapped in the AuthProvider component which provides authentication state to the app.
 * Created by: Leo Schonberger
 * Last updated by: Leo Schonberger
 * Last updated on: 2024-12-6
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapPage from './pages/MapPage';
import Login from './components/Login';
import ActivityPage from './pages/ActivityPage';
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage component
import OnboardingPage from './pages/OnboardingPage';
import { AuthProvider } from './components/AuthContext';

// Main application component with routing for different pages
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
