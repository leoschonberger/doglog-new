// Login.js

/*
 * This file represents the Login component which allows users to sign in using Google authentication.
 * 
 * Group Name: Dog Doo Data
 * 
 * Authors:
 * - Sterling Miller
 * - Leo Schonberger
 * 
 * Component: Login
 * Description: This component provides a Google sign-in button and handles user authentication via 
 *              Firebase Authentication. Navigates to onboarding or map page based on user's dog data.
 *              Calls signInWithPopup service to authenticate with Google and fetchDogs service to 
 *              check for existing dogs.
 * Created by: Leo Schonberger
 * Last updated by: Sterling Miller
 * Last updated on: 2024-11-22
 */

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Alert } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { fetchDogs } from '../services/dogService';

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
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  useEffect(() => {
    const checkUserDogs = async () => {
      if (user) {
        const dogs = await fetchDogs(user.uid);
        if (dogs.length === 0) {
          navigate('/welcome'); // Redirect to the welcome page if no dogs are found
        } else {
          navigate('/map'); // Redirect to the map page if dogs are found
        }
      }
    };

    checkUserDogs();
  }, [user, navigate]);

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
