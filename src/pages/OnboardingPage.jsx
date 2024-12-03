// OnboardingPage.jsx
import React from 'react';
import AddDog from '../components/AddDog';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
    const navigate = useNavigate();

    const handleAddDog = () => {
        navigate('/profile'); // Navigate to the profile page where they can add a dog
    };

    const handleDogAdded = () => {
        navigate('/map'); // Navigate to the MapPage after a dog is added
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                <Typography variant="h4" gutterBottom>Welcome to DogLog!</Typography>
                <Typography variant="body1" gutterBottom>
                    It looks like you don't have any dogs associated with your profile yet!
                </Typography>
                <AddDog onDogAdded={handleDogAdded} />
            </Box>
        </Container>
    );
};

export default OnboardingPage;