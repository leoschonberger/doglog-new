// UpdatePin.jsx

/*
 * This file represents the UpdatePin component which allows users to update existing pins.
 * 
 * Group Name: Doo Doo Data
 * 
 * Authors:
 * - Nick Johnson
 * - Sterling Miller
 * 
 * Component: UpdatePin
 * Description: This component provides a pop-up form for updating a pin's details including 
 *              latitude, longitude, event, dog, title, description, and timestamp. Calls the
 *              updatePin service.
 * Created by: Sterling Miller
 * Last updated by: Nick Johnson
 * Last updated on: 2024-12-02
 */

import { db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { fetchDogs } from '../services/dogService';
import { updatePin } from '../services/pinService';
import { useAuth } from '../components/AuthContext';
import UpdateIcon from '@mui/icons-material/Update';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const UpdatePin = ({ pinId, onPinUpdated }) => {
    // Authenticate user
    const { user } = useAuth();

    // For dog selection
    const [dogNames, setDogNames] = useState([]);
    const [open, setOpen] = useState(false);

    // For pin usage
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [event, setEvent] = useState('');
    const [dogID, setDogID] = useState('');
    const [dogName, setDogName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');  
    const [timestamp, setTimestamp] = useState(new Date());

    // Error handling
    const [error, setError] = useState('');

    // Effect to load the dog names when the user changes
    useEffect(() => {
        const loadDogNames = async () => {
            try {
                const names = await fetchDogs(user.uid);
                setDogNames(names);
            } catch (error) {
                console.error('Error fetching dog names:', error);
            }
        };

        if (user) {
            loadDogNames();
        }
    }, [user]);

    // Effect to load the pin data when the pinId changes
    useEffect(() => {
        const loadPin = async () => {
            try {
                // Query the pins collection for the pin with the given pinId
                const pinRef = doc(db, 'pins', pinId);
                const pinDoc = await getDoc(pinRef);

                // If the pin is found, set the state with the pin data
                if (pinDoc.exists()) {
                    const pinData = pinDoc.data();
                    setLatitude(pinData.latitude || '');
                    setLongitude(pinData.longitude || '');
                    setEvent(pinData.event);
                    setDogID(pinData.dogID);
                    setTitle(pinData.title);
                    setDescription(pinData.description);
                    setTimestamp(pinData.timestamp.toDate());
                } else {
                    console.error('Pin not found');
                }
            } catch (error) {
                console.error('Error fetching pin:', error);
            }
        };

        if (user && pinId) {
            loadPin();
        }
    }, [pinId, user]);

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
    const handleUpdatePin = async (e) => {
        e.preventDefault();

        // Check if timestamp is not inputted. If so, Sets error message
        if (!timestamp || !title || isNaN(new Date(timestamp).getTime())) {
            setError('Required fields are missing');
            return;
        }
        try {
            // Reference the pin document directly using the pinId
            const updatedPin = {};

            if (latitude) updatedPin.latitude = parseFloat(latitude);
            if (longitude) updatedPin.longitude = parseFloat(longitude);
            if (event) updatedPin.event = event;
            if (title) updatedPin.title = title;
            if (description) updatedPin.description = description;
            if (timestamp) updatedPin.timestamp = timestamp;
            if (dogID) updatedPin.dogID = dogID;

            await updatePin(user.id, pinId, updatedPin);
            console.log('Pin updated successfully');
            onPinUpdated();
            handleClose();

        } catch (error) {
            console.error('Error updating pin:', error);
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} variant="contained" color="black" size="small">
                <UpdateIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Pin</DialogTitle>
                <DialogContent>
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
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Dog</InputLabel>
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
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Event</InputLabel>
                        <Select
                            label="Event"
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
                        label="Timestamp" 
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
                    <Button onClick={handleUpdatePin} variant="contained">Update Pin</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdatePin;