// AddDog.jsx

import React, { useState } from 'react';
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useAuth } from './AuthContext';
import { addDog } from '../services/dogService';

const AddDog = ({ onDogAdded }) => {
  const { user } = useAuth();
  const [dogName, setDogName] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // Initially closed

  const handleAddDog = async (e) => {
    e.preventDefault();
    if (!dogName) {
      setError('Dog name is required');
      return;
    }

    const newDog = {
      Name: dogName,
      Age: dogAge,
      Breed: dogBreed,
      Gender: dogGender,
      timestamp: new Date(),
      userId: user.uid
    };

    try {
      await addDog(user.uid, newDog);
      console.log('Dog added successfully');
      setDogName('');
      setDogAge('');
      setDogBreed('');
      setDogGender('');
      setError('');
      setOpen(false); // Close the dialog after successful submission
      if (onDogAdded) {
        onDogAdded();
      }
    } catch (error) {
      console.error('Error adding dog:', error);
      setError('Failed to add dog');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Dog
      </Button>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Add New Dog</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddDog}>
            <TextField
              label="Dog Name"
              fullWidth
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              margin="normal"
              required
              error={!!error && !dogName}
              helperText={!!error && !dogName ? 'Dog name is required' : error}
            />
            <TextField
              label="Dog Age"
              fullWidth
              value={dogAge}
              onChange={(e) => setDogAge(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Dog Breed"
              fullWidth
              value={dogBreed}
              onChange={(e) => setDogBreed(e.target.value)}
              margin="normal"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Dog Gender</InputLabel>
              <Select
                label="Dog Gender"
                value={dogGender}
                onChange={(e) => setDogGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Add Dog
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDog;