// ProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import Achievements from '../components/Achievements';
import DogCards from '../components/DogCards';
import ProfileInfo from '../components/ProfileInfo';
import { fetchDogs } from '../services/dogService';
import AddDog from '../components/AddDog';

const ProfilePage = () => {
  const { user } = useAuth();
  const [dogs, setDogs] = useState([]);

  const fetchDogsServer = async () => {
    const dog_data = fetchDogs(user.uid);
    return dog_data;
  };

  useEffect(() => {
    const loadDogs = async () => {
      if (user) {
        try {
          const dogs = await fetchDogs(user.uid);
          const dogsData = dogs.map(([id, name]) => ({ id, name }));
          setDogs(dogsData);
        } catch (error) {
          console.error('Error fetching dogs:', error);
        }
      }
    };

    loadDogs();
  }, [user]);

  // This function will (eventually) update the dog cards when a dog is removed 
  const handleDogRemoved = (dogId) => {
    setDogs(dogs.filter(dog => dog.id !== dogId));
  };

  // This function will update the dog cards when a dog is updated
  const handleDogUpdated = async () => {
    const updatedDogs = await fetchDogsServer();
    const dogsData = updatedDogs.map(([id, name]) => ({ id, name }));
    setDogs(dogsData);
  };

  return (
    <Container maxWidth="lg" sx={{ px: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {user && (
          <>
            {/* Profile Info Section */}
            <ProfileInfo />

            {/* Achievements Section */}
            <Achievements />

            {/* Dog Cards Section */}
            <DogCards
              dogs={dogs}
              onDogRemoved={handleDogRemoved}
              onDogUpdated={handleDogUpdated} 
            />
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
              <AddDog onDogAdded={handleDogUpdated}/>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;