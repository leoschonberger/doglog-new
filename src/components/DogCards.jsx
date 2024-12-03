// DogCards.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import DogActionsDropdown from './DogActionsDropdown';
import { fetchDog, fetchStats } from '../services/dogService';
import Stats from './Stats';

const DogCards = ({ dogs, onDogRemoved, onDogUpdated }) => {
  const [detailedDogs, setDetailedDogs] = useState([]);

  useEffect(() => {
    const loadDogDetails = async () => {
      const dogsData = await Promise.all(dogs.map(async (dog) => {
        const detailedDog = await fetchDog(dog.id);
        const stats = await fetchStats(dog.id);
        return { ...detailedDog, stats };
      }));
      setDetailedDogs(dogsData);
    };

    loadDogDetails();
  }, [dogs]);

  return (
    <Box mt={4} width="100%">
      <Typography variant="h6" align="left" gutterBottom>
        Your Dogs
      </Typography>
      <Grid container spacing={2}>
        {detailedDogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" align="center">
                    {dog.Name}, {dog.Age}
                  </Typography>
                  <DogActionsDropdown
                    dogId={dog.id}
                    onDogRemoved={() => onDogRemoved(dog.id)}
                    onDogUpdated={onDogUpdated}
                  />
                </Box>
                <Typography variant="body2" align="left" color="textSecondary">
                  {dog.Breed} | {dog.Gender}
                </Typography>
                <Stats stats={dog.stats} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DogCards;