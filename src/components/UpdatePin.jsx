// UpdatePin.jsx
// Form component that allows users to update existing pins

import { db } from '../config/firebase';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const UpdatePin = ({ onPinUpdated }) => {
    // Authenticate user
    const { user } = useAuth();

    // State to hold the latitude, longitude, title, timestamp, and original title of the pin
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [title, setTitle] = useState('');
    const [timestamp, setTimestamp] = useState(new Date());
    const [originalTitle, setOriginalTitle] = useState('');

    // Effect to load the pin data when the original title changes
    useEffect(() => {
        const loadPin = async () => {
            try {
                // Query the pins collection for the pin with the user's ID and the original title
                const pinsRef = collection(db, 'pins');
                const q = query(pinsRef, where('userId', '==', user.uid), where('title', '==', originalTitle));
                const querySnapshot = await getDocs(q);

                // If the pin is found, set the state with the pin data
                if (!querySnapshot.empty) {
                    const pinDoc = querySnapshot.docs[0];
                    const pinData = pinDoc.data();
                    setLatitude(pinData.latitude);
                    setLongitude(pinData.longitude);
                    setTitle(pinData.title);
                    setTimestamp(pinData.timestamp.toDate());

                } else {
                    console.error('Pin not found');
                }

            } catch (error) {
                console.error('Error fetching pin:', error);
            }
        };

        if (user && originalTitle) {
            loadPin();
        }
    }, [originalTitle, user]);

    // Function to clear the input fields
    const clearInputs = () => {
        setLatitude('');
        setLongitude('');
        setTitle('');
        setTimestamp(new Date());
        setOriginalTitle('');
    };

    // Function to handle the update of the pin
    const handleUpdatePin = async (e) => {
        e.preventDefault();
        try {
            // Query the pins collection for the pin with the user's ID and the original title
            const pinsRef = collection(db, 'pins');
            const q = query(pinsRef, where('userId', '==', user.uid), where('title', '==', originalTitle));
            const querySnapshot = await getDocs(q);

            // If the pin is found, update the pin with the new data
            if (!querySnapshot.empty) {
                const pinDoc = querySnapshot.docs[0];
                const pinRef = doc(db, 'pins', pinDoc.id);
                const updatedPin = {};

                if (latitude) updatedPin.latitude = parseFloat(latitude);
                if (longitude) updatedPin.longitude = parseFloat(longitude);
                if (title) updatedPin.title = title;
                if (timestamp) updatedPin.timestamp = timestamp;

                await updateDoc(pinRef, updatedPin);
                console.log('Pin updated successfully');
                onPinUpdated();

            } else {
                console.error('Pin not found');
            }

        } catch (error) {
            console.error('Error updating pin:', error);

        } finally {
            clearInputs();
        }
    };

    // Temp for testing on map page
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h5">Update Pin</Typography>
                <TextField
                    label="Original Title"
                    fullWidth
                    value={originalTitle}
                    onChange={(e) => setOriginalTitle(e.target.value)}
                    margin="normal"
                />
                <form onSubmit={handleUpdatePin}>
                    <TextField 
                        label="Latitude" 
                        fullWidth 
                        value={latitude} 
                        onChange={(e) => setLatitude(e.target.value)} 
                        sx={{ mb: 1 }} 
                    />
                    <TextField 
                        label="Longitude" 
                        fullWidth 
                        value={longitude} 
                        onChange={(e) => setLongitude(e.target.value)} 
                        sx={{ mb: 1 }} 
                    />
                    <TextField 
                        label="Title" 
                        fullWidth 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        sx={{ mb: 1 }} 
                    />
                    <TextField 
                        label="Timestamp" 
                        type="datetime-local" 
                        fullWidth 
                        value={timestamp} 
                        onChange={(e) => setTimestamp(new Date(e.target.value))} 
                        sx={{ mb: 1 }} 
                    />
                    <Button type="submit" variant="contained">Update Pin</Button>
                </form>
            </Box>
        </Container>
    );
};

export default UpdatePin;