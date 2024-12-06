// src/theme.js
// This file defines the custom theme for the application using Material-UI's createTheme function.

import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  // Define the color palette
  palette: {
    primary: {
      main: '#96897B', // Primary color
    },
    secondary: {
      main: '#37423D', // Secondary color
    },
  },
  // Define typography settings
  typography: {
    fontFamily: 'Raleway, Arial, sans-serif', // Custom font family
  },
});

export default theme; // Export the custom theme