/*
PinInputForm.jsx

Main Pin Addition form component on Map page. Allows users to add a new pin/event to the database
with information including Longitude, Latitude, Dog, Event, Title, Description, and Timestamp. Also handles
some features of the form such as automatic timestamp generation and reset of values after addition of Pin.
*/

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Select, MenuItem, InputLabel, FormControl, Card, CardContent, FormHelperText} from '@mui/material';
import { useAuth } from './AuthContext';
import { fetchDogs } from '../services/dogService';
import { pinInputForm } from '../services/pinService';

const PinInputForm = ({ clickedLocation, onPinAdded }) => {
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
  const [timestamp, setTimestamp] = useState('');

  // For Error Checking
  const [error, setError] = useState('');

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

  // Set the initial value of the timestamp to the current date and time
  useEffect(() => {
    resetTimestamp();
  }, []);
  
  const resetTimestamp = async (e) => {
    const now = new Date();
    const localDateTime = now.toLocaleString('sv-SE', { timeZoneName: 'short' }).replace(' ', 'T');
    setTimestamp(localDateTime.slice(0, 16));
  };

  // Handle form submission to add a new pin
  const handleAddPin = async (e) => {
    e.preventDefault();
    if (!dogID || !event || !title || !timestamp) {
      setError('Please fill out all required fields');
      return;
    }
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
      await pinInputForm(newPin);
      console.log('Pin added successfully');
      // Optionally, reset the form fields
      setLatitude('');
      setLongitude('');
      setDogID('');
      setEvent('');
      setTitle('');
      setDescription('');
      setError('');
      onPinAdded();
      resetTimestamp();
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
    <Container>
      <Card>
        <CardContent>
          <Box>
            <Typography variant="h5" gutterBottom>Add New Pin</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                * = Required Field 
            </Typography>
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
              <FormControl fullWidth margin="normal" variant="outlined" error={!dogID && !!error}>
                <InputLabel>Dog*</InputLabel>
                <Select
                  label="Dog"
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
                <FormHelperText>{!dogID && error && 'Dog is required'}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="normal" variant="outlined" error={!event && !!error}>
                <InputLabel>Event*</InputLabel>
                <Select
                  label="Event"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                >
                  <MenuItem value="Restroom">Restroom</MenuItem>
                  <MenuItem value="Meal">Meal</MenuItem>
                  <MenuItem value="Exercise">Exercise</MenuItem>
                </Select>
                <FormHelperText>{!event && error && 'Event is required'}</FormHelperText>
              </FormControl>
              <TextField
                label="Title*"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                error={!title && !!error}
                helperText={!title && error && 'Title is required'}
              />
              <TextField 
                label="Description" 
                fullWidth 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                margin="normal"
              />
              <TextField 
                label="Timestamp*"
                type="datetime-local" 
                fullWidth 
                // making value correct local time if inputted, else keep field blank
                value={timestamp ? formatDateTimeLocal(new Date(timestamp)) : ''}
                onChange={(e) => setTimestamp(e.target.value)} 
                margin="normal"
                error = {!timestamp && !!error}
                helperText = {!timestamp && error && 'Timestamp is required'}
                // Keeps "Timestamp*" label at top of input field, rather than overlapping mm:dd:yyyy
                InputLabelProps={{ shrink: true }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Pin</Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PinInputForm;
