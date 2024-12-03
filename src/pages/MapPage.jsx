// MapPage.js
// Page component that combines Navbar, Map, and PinInputForm components

import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import PinInputForm from '../components/PinInputForm';
import { Box, Container, Grid2 } from '@mui/material';
import { fetchPins } from '../services/pinService';
import { useAuth } from '../components/AuthContext';

const MapPage = () => {
  const { user } = useAuth();
  const [clickedLocation, setClickedLocation] = useState(null);
  const [pins, setPins] = useState([]);

  const loadPins = async () => {
    try {
      const pinsData = await fetchPins(user.uid);
      if (Array.isArray(pinsData)) {
        const validPins = pinsData
          .filter((pin) => pin.latitude && pin.longitude)
          .map((pin) => ({
            id: pin.id,
            title: pin.title || "Untitled Pin",
            latitude: pin.latitude,
            longitude: pin.longitude,
            description: pin.description || "",
          }));
        setPins(validPins);
      } else {
        console.error("Invalid pins data format");
      }
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadPins();
    }
  }, [user]);

  return (
    <Box>
        <Grid2 container spacing={1} >
          <Grid2 size={{xs:12, md: 8, lg: 8, xl: 9}}>
               <Map pins={pins} onMapClick={setClickedLocation} />
          </Grid2>
          <Grid2 size ={{xs:12, md: 4, lg: 4, xl: 3}}>
            <Box mt={4}></Box>
            <PinInputForm clickedLocation={clickedLocation} onPinAdded={loadPins} />
          </Grid2>
        </Grid2>
    </Box>
  );
};

export default MapPage;
