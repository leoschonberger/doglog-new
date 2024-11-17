// AddPin.js
// Form component that allows users to add pins with location, title, and timestamp

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../components/AuthContext';
import { addPin, fetchPins } from '../services/pinService'
import { fetchNames } from '../services/dogService'

const AddPin = ({ clickedLocation, onPinAdded }) => {
  const { user } = useAuth();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [event, setEvent] = useState('');
  const [dogID, setDogID] = useState('');
  const [dogNames, setDogNames] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');  
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

  // Function that will grab the dog names from our database
  // once user opens "dog" input field
  useEffect(() => {
    const loadDogNames = async () => {
      try {
        const names = await fetchNames(user.uid);
        setDogNames(names);
        console.log('Fetched dog names:', names);
      } catch (error) {
        console.error('Error fetching dog names', error); 
      }
    };
    loadDogNames();
  }, [user]);

  const handleAddPin = async (e) => {
    e.preventDefault();
    const newPin = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      dogID,
      event,
      title,
      description,
      userId: user.uid,
      timestamp: Timestamp.fromDate(new Date(timestamp)),  
    }
    try {
      await addPin(newPin);
      console.log('Pin added successfully');
      // Optionally, reset the form fields
      setLatitude('');
      setLongitude('');
      setDogID('');
      setEvent('');
      setTitle('');
      setTimestamp(new Date());
      setDescription('');
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
          <TextField 
            label="Latitude" 
            fullWidth value={latitude} 
            onChange={(e) => setLatitude(e.target.value)} 
          />
          <TextField 
            label="Longitude" 
            fullWidth value={longitude} 
            onChange={(e) => setLongitude(e.target.value)} 
          />
          <FormControl fullWidth>
            <InputLabel>Dog</InputLabel>
            <Select
              value={dogID}
              onChange={(e) => setDogID(e.target.value)}
            >
              {dogNames.map(([id, name]) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Event</InputLabel>
            <Select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            >
              <MenuItem value="Restroom">Restroom</MenuItem>
              <MenuItem value="Meal">Meal</MenuItem>
              <MenuItem value="Exercise">Exercise</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            label="Title" 
            fullWidth value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <TextField 
            label="Description" 
            fullWidth value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <TextField 
            label="" 
            type="datetime-local" 
            fullWidth onChange={(e) => setTimestamp(new Date(e.target.value))} 
          />
          <Button type="submit" variant="contained">Add Pin</Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddPin;
