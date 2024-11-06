// MapPage.js
import React from 'react';
import Navbar from './Navbar'; // Import Navbar component
import Map from './Map';       // Import Map component
import { Box } from '@mui/material';
import AddPin from './AddPin';

const MapPage = () => {
  return (
    <Box>
      <Navbar />   {/* Render Navbar at the top */}
      <Map />      {/* Render Map component below */}
      <AddPin />
    </Box>
  );
};

export default MapPage;