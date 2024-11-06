// AddPin.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { db } from '../config/firebase'; // Import Firestore database
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const AddPin = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());

  // Function to handle adding a pin to Firestore
  const handleAddPin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!latitude || !longitude || !title) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Reference to the Firestore collection
      const pinsCollection = collection(db, 'pins');
      
      // Add a new document to Firestore
      await addDoc(pinsCollection, {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        title,
        timestamp: Timestamp.fromDate(new Date(timestamp)),
      });

      // Clear form fields
      setLatitude('');
      setLongitude('');
      setTitle('');
      setTimestamp(new Date());

      alert('Pin added successfully!');
    } catch (error) {
      console.error('Error adding pin:', error);
      alert('Failed to add pin. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Pin
        </Typography>
        <form onSubmit={handleAddPin}>
          <TextField
            label="Latitude"
            variant="outlined"
            fullWidth
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Longitude"
            variant="outlined"
            fullWidth
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Timestamp"
            type="datetime-local"
            variant="outlined"
            fullWidth
            value={timestamp.toISOString().slice(0, -8)} // Format for input
            onChange={(e) => setTimestamp(new Date(e.target.value))}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Pin
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddPin;
