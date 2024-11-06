// MapPage.js
// Page component that combines Navbar, Map, and AddPin components

import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
import Map from '../components/Map';
import AddPin from '../components/AddPin';
import { Box, Container } from '@mui/material';

const MapPage = () => {
  const [clickedLocation, setClickedLocation] = useState(null);

  return (
    <Box>
      {/* <Navbar /> */}
      <Container maxWidth="md">
        <Map onMapClick={setClickedLocation} />
        <AddPin clickedLocation={clickedLocation} />
      </Container>
    </Box>
  );
};

export default MapPage;
