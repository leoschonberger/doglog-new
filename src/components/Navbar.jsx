// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../components/AuthContext'; // Access user context
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate('/'); // Redirect to login or home page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Link to Map */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Map
        </Typography>
        {/* Link to Activity page */}
        <Button color="inherit" component={Link} to="/activity">
          Activity
        </Button>
        {user ? (
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;