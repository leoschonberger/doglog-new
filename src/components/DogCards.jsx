// DogCards.jsx

import React from 'react';
import { Box, Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import DogActionsDropdown from './DogActionsDropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DogCards = ({ dogs , onDogRemoved, onDogUpdated}) => {
  return (
    <Box mt={4} width="100%">
      <Typography variant="h6" align="left" gutterBottom>
        Your Dogs
      </Typography>
      <Grid container spacing={2}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" align="center">
                    {dog.name}
                  </Typography>
                  <DogActionsDropdown
                    dogId={dog.id}
                    onDogRemoved={() => onDogRemoved(dog.id)} 
                    onDogUpdated={onDogUpdated} 
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DogCards;