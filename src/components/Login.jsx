// Login.js
import React, { useState } from 'react';
import { Box, Button, Typography, Container, Alert } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const provider = new GoogleAuthProvider();

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoogleSignIn = async () => {
    setError(''); // Reset error before login attempt

    try {
      await signInWithPopup(auth, provider);
      console.log('User signed in with Google successfully');
      navigate('/map'); // Navigate to the Map page
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  // If the user is already logged in, redirect to the map page
  if (user) {
    navigate('/map');
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in with Google
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
