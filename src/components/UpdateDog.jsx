/*
UpdateDog.jsx

Component associated with DogActionsDropdown. Represents the form shown when a user initiates updating a dog
from the DogActionsDropdown component. Allows user to update the name, age, breed, and gender of the dog.
*/
import { db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { fetchDog, fetchDogs } from '../services/dogService';
import { updateDog } from '../services/dogService';
import { useAuth } from '../components/AuthContext';
import UpdateIcon from '@mui/icons-material/Update';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const UpdateDog = ({ dogId, onDogUpdated }) => {
    // Authenticate user
    const { user } = useAuth();

    const [open, setOpen] = useState(false);

    // For dog usage
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');  
    const [gender, setGender] = useState('');
    const [timestamp, setTimestamp] = useState(new Date());

    // Error handling
    const [error, setError] = useState('');

    // Effect to load the pin data when the pinId changes
    useEffect(() => {
        const loadDog = async () => {
            try {
                // Query the dog collection for the dog with the given dogId
                const dogRef = doc(db, 'dogs', dogId);
                const dogDoc = await getDoc(dogRef);

                // If the dog is found, set the state with the dog data
                if (dogDoc.exists()) {
                    const dogData = dogDoc.data();
                    setName(dogData.Name);
                    setAge(dogData.Age);
                    setBreed(dogData.Breed);
                    setGender(dogData.Gender);
                    setTimestamp(dogData.timestamp.toDate());
                } else {
                    console.error('Dog not found');
                }
            } catch (error) {
                console.error('Error fetching Dog:', error);
            }
        };

        if (user && dogId) {
            loadDog();
        }
    }, [dogId, user]);

    // Function to open the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to close the dialog
    const handleClose = () => {
        setOpen(false);
        setError('');
    };

    // Function to format the date and time for the input field
    const formatDateTimeLocal = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Function to handle the update of the pin
    const handleUpdateDog = async (e) => {
        e.preventDefault();

        // Check if timestamp is not inputted. If so, Sets error message
        if (!timestamp || !name || isNaN(new Date(timestamp).getTime())) {
            setError('Required fields are missing');
            return;
        }
        try {
            // Reference the pin document directly using the pinId
            const updatedDog = {};

            if (name) updatedDog.Name = name
            if (age) updatedDog.Age = age;
            if (breed) updatedDog.Breed = breed;
            if (gender) updatedDog.Gender = gender;
            if (timestamp) updatedDog.timestamp = timestamp;

            await updateDog(user.id, dogId, updatedDog);
            console.log('Dog updated successfully');
            onDogUpdated();
            handleClose();

        } catch (error) {
            console.error('Error updating dog:', error);
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} variant="contained" color="black" size="small">
                <UpdateIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Dog</DialogTitle>
                <DialogContent>
                    <TextField 
                        label="Name" 
                        fullWidth 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        error={(!name && !!error)}
                        helperText={!name && error && 'Name is required'}
                    />
                    <TextField 
                        label="Age" 
                        fullWidth 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)}
                        margin="normal"
                    />
                    <TextField 
                        label="Breed" 
                        fullWidth 
                        value={breed} 
                        onChange={(e) => setBreed(e.target.value)} 
                        margin="normal" 
                    />
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            label="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        label="Date Created" 
                        type="datetime-local" 
                        fullWidth 
                        value={timestamp ? formatDateTimeLocal(timestamp) : ''}
                        onChange={(e) => setTimestamp(e.target.value ? (new Date(e.target.value)) : '')} 
                        margin="normal"
                        error = {!timestamp && !!error}
                        helperText={!timestamp && error && 'Timestamp is required'}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdateDog} variant="contained">Update Dog</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateDog;