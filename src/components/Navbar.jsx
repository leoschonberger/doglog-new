// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useAuth } from '../components/AuthContext'; // Access user context
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import favicon from '/favicon-32x32.png'; // Import the favicon image
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        {/* Favicon and Title */}
        <Box display="flex" alignItems="center">
          <img src={favicon} alt="DogLog Logo" style={{ width: 32, height: 32, marginRight: 8 }} />
          {!isSmallScreen && (
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              DogLog
            </Typography>
          )}
        </Box>
        {/* Link to Map */}
        <Button color="inherit" component={Link} to="/map">Map</Button>
        {/* Link to Activity page */}
        <Button color="inherit" component={Link} to="/activity">Activity</Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;