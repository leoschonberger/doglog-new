// AddPin.js
// Form component that allows users to add pins with location, title, and timestamp

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Select, MenuItem, InputLabel, FormControl, Card, CardContent } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchDogs } from '../services/dogService';
import { addPin } from '../services/pinService';

const AddPin = ({ clickedLocation, onPinAdded }) => {
  // General
  const { user } = useAuth();
  const [dogNames, setDogNames] = useState([]);

  // For pin usage
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [event, setEvent] = useState('');
  const [dogID, setDogID] = useState('');
  const [dogName, setDogName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');  
  const [timestamp, setTimestamp] = useState(new Date());

  // Set latitude and longitude when clickedLocation changes
  useEffect(() => {
    if (clickedLocation) {
      setLatitude(clickedLocation.lat);
      setLongitude(clickedLocation.lng);
    }
  }, [clickedLocation]);

  // Fetch dog names when the component mounts
  useEffect(() => {
    const loadDogNames = async () => {
      try {
        const names = await fetchDogs(user.uid);
        setDogNames(names);
      } catch (error) {
        console.error('Error fetching dog names', error); 
      }
    };
    
    if (user) {
      loadDogNames();
    }
  }, [user]);

  // Handle form submission to add a new pin
  const handleAddPin = async (e) => {
    e.preventDefault();
    const newPin = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      dogID,
      dogName,
      event,
      title,
      description,
      userId: user.uid,
      timestamp: new Date(timestamp),  
    };
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
      onPinAdded();
    } catch (error) {
      console.error('Error adding pin:', error);
    }
  };

  const formatDateTimeLocal = (date) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Box>
            <Typography variant="h5" gutterBottom>Add New Pin</Typography>
            <form onSubmit={handleAddPin}>
              <TextField
                label="Latitude"
                fullWidth
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Longitude"
                fullWidth
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Dog</InputLabel>
                <Select
                  value={dogID}
                  onChange={(e) => {
                    const selectedDog = dogNames.find(dog => dog[0] === e.target.value);
                    setDogID(e.target.value);
                    setDogName(selectedDog ? selectedDog[1] : '');
                  }}
                >
                  {dogNames.map(([id, name]) => (
                    <MenuItem key={id} value={id}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
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
                fullWidth 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                margin="normal"
              />
              <TextField 
                label="Description" 
                fullWidth 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                margin="normal"
              />
              <TextField 
                label="Timestamp" 
                type="datetime-local" 
                fullWidth 
                value={formatDateTimeLocal(timestamp)}
                onChange={(e) => setTimestamp(new Date(e.target.value))} 
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Pin</Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddPin;
