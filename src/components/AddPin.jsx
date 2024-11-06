// AddPin.js
// Form component that allows users to add pins with location, title, and timestamp

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../components/AuthContext';

const AddPin = ({ clickedLocation }) => {
  const { user } = useAuth();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    if (clickedLocation) {
      setLatitude(clickedLocation.lat);
      setLongitude(clickedLocation.lng);
    }
  }, [clickedLocation]);

  const handleAddPin = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'pins'), {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      title,
      userId: user.uid,
      timestamp: Timestamp.fromDate(new Date(timestamp)),
    });
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
