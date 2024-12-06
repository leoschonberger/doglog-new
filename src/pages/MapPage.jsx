// MapPage.jsx
// This file contains the MapPage component which combines the Map and PinInputForm components to display the map and handle pin input.

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Import Grid2 for layout
import Map from '../components/Map';
import PinInputForm from '../components/PinInputForm';
import { fetchPins } from '../services/pinService';
import { useAuth } from '../components/AuthContext';

const MapPage = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [clickedLocation, setClickedLocation] = useState(null); // State to store the location clicked on the map
  const [pins, setPins] = useState([]); // State to store the pins

  // Function to load pins from the database
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

  // Load pins when the user changes
  useEffect(() => {
    if (user) {
      loadPins();
    }
  }, [user]);

  return (
    <Box>
      <Grid2 container spacing={2} paddingRight={1}>
        {/* Map Section */}
        <Grid2 size={{ xs: 12, md: 8, lg: 8, xl: 9 }}>
          <Map pins={pins} onMapClick={setClickedLocation} />
        </Grid2>
        {/* Pin Input Form Section */}
        <Grid2 size={{ xs: 12, md: 4, lg: 4, xl: 3 }}>
          <Box mt={4}></Box>
          <PinInputForm clickedLocation={clickedLocation} onPinAdded={loadPins} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MapPage;
