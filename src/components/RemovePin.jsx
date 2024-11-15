// RemovePin.jsx
// Form component that allows users to remove pins by title

import { removePin } from '../services/pinService';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const RemovePin = ({ onPinRemoved }) => {
    // Authenticate user
    const { user } = useAuth();

    // State to hold the title of the pin to be removed
    const [title, setTitle] = useState('');

    // Function to handle the removal of the pin
    const handleRemovePin = async (e) => {
        e.preventDefault();

        try {
            // Call the removePin service with the user's ID and the pin title
            await removePin(user.uid, title);
            console.log('Pin removed successfully');
            onPinRemoved();

            // Reset the title state
            setTitle('');
        
        // Log the error and reset the title state
        } catch (error) {
            setTitle('');
            console.error('Error removing pin:', error);
        }
    };

    // Temp for testing on map page
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h5">Remove Pin</Typography>
                <form onSubmit={handleRemovePin}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button type="submit" variant="contained">Remove Pin</Button>
                </form>
            </Box>
        </Container>
    );
};

export default RemovePin;