// AddPin.js
// Form component that allows users to add pins with location, title, and timestamp

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { addPin } from '../services/pinService';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

const AddPin = ({ clickedLocation }) => {
  // Authenticate user
  const { user } = useAuth();
  // Creating pin object with setPin function and useState updates the state
  const [pin, setPin] = useState({
    latitude: '',
    longitude: '',
    title: '',
    timestamp: new Date(),
    dog: '',
    event: '',
    description: '',
  });

  // updates the longitude and latitude of the pin when a location is clicked on the map
  // May or may not work right now, 
  useEffect(() => {
    if (clickedLocation) {
      setPin((prevPin) => ({
        ...prevPin,
        latitude: clickedLocation.lat,
        longitude: clickedLocation.lng,
      }));
    }
  }, [clickedLocation]);

  const handleAddPin = async (e) => {
    e.preventDefault();

    // Creating pin with information that can be stored in Firebase
    const newPin = {
      // Takes previous information that is passed when user inputs into TextFields below
      ...pin,
      // Converts the string to a float
      latitude: parseFloat(pin.latitude),
      longitude: parseFloat(pin.longitude),
      // Timestamp is a Firestore object that converts the date to a Firestore timestamp
      timestamp: Timestamp.fromDate(new Date(pin.timestamp)),
    };
    try {
      await addPin(newPin);
      console.log('Pin added successfully');
    } catch (error) {
      console.error('Error adding pin:', error);
    }
  };

  // all onChange functions update the state of the pin object during input
  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h5">Add New Pin</Typography>
        <form onSubmit={handleAddPin}>
          <TextField
            label="Latitude"
            fullWidth
            value={pin.latitude}
            onChange={(e) => setPin({ ...pin, latitude: e.target.value })}
          />
          <TextField
            label="Longitude"
            fullWidth
            value={pin.longitude}
            onChange={(e) => setPin({ ...pin, longitude: e.target.value })}
          />
          <TextField
            label="Title"
            fullWidth
            value={pin.title}
            onChange={(e) => setPin({ ...pin, title: e.target.value })}
          />
          <TextField
            label="Dog"
            fullWidth
            value={pin.dog}
            onChange={(e) => setPin({ ...pin, dog: e.target.value })}
          />
          <TextField
            label="Event"
            fullWidth
            value={pin.event}
            onChange={(e) => setPin({ ...pin, event: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            value={pin.description}
            onChange={(e) => setPin({ ...pin, description: e.target.value })}
          />
          <Button type="submit" variant="contained">Add Pin</Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddPin;
