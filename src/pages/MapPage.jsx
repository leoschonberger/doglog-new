// MapPage.js
// Page component that combines Navbar, Map, and PinInputForm components

import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import PinInputForm from '../components/PinInputForm';
import AddDog from '../components/AddDog';
import { Box, Container } from '@mui/material';
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
      <Container maxWidth="md">
        <Map pins={pins} onMapClick={setClickedLocation} />
        {/* temp */}
        <Box display="flex" justifyContent="center" mt={4}>
          <AddDog />
        </Box>
        <Box mt={4}> {/* Adds margin-top of 4 units */}
          <PinInputForm clickedLocation={clickedLocation} onPinAdded={loadPins} />
        </Box>
        
      </Container>
    </Box>
  );
};

export default MapPage;
