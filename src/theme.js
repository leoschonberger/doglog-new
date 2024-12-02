// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#96897B',
    },
    secondary: {
      main: '#37423D',
    },
  },
  typography: {
    fontFamily: 'Raleway, Arial, sans-serif',
  },
});

export default theme;