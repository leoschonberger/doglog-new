// AddPin.js
// Form component that allows users to add pins with location, title, and timestamp

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../components/AuthContext';

const AddPin = ({ clickedLocation, onPinAdded }) => {
  const { user } = useAuth();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());
  const [pins, setPins] = useState([]);

  useEffect(() => {
    if (clickedLocation) {
      setLatitude(clickedLocation.lat);
      setLongitude(clickedLocation.lng);
    }
  }, [clickedLocation]);

  useEffect(() => {
    const loadPins = async () => {
      try {
        const pinsData = await fetchPins(user.uid);
        console.log('Fetched pins:', pinsData);
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
    loadPins();
  }, [user]);

  const handleAddPin = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pins'), {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        title,
        userId: user.uid,
        timestamp: Timestamp.fromDate(new Date(timestamp)),
      });
      console.log('Pin added successfully');
      // Optionally, reset the form fields
      setLatitude('');
      setLongitude('');
      setTitle('');
      setTimestamp(new Date());
      // Refresh the pins on the map
      onPinAdded();
    } catch (error) {
      console.error('Error adding pin:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h5">Add New Pin</Typography>
        <form onSubmit={handleAddPin}>
          <TextField label="Latitude" fullWidth value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <TextField label="Longitude" fullWidth value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="" type="datetime-local" fullWidth onChange={(e) => setTimestamp(new Date(e.target.value))} />
          <Button type="submit" variant="contained">Add Pin</Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddPin;
