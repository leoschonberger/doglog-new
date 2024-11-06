// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MapPage from './components/MapPage';
import ActivityPage from './components/ActivityPage';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/activity" element={<ActivityPage/>}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;