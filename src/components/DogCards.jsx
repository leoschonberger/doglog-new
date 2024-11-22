//DogCards.jsx

import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const DogCards = () => {
  return (
    <Box mt={4} width="100%">
      <Typography variant="h6" align="left" gutterBottom>
        Your Dogs
      </Typography>
      <Grid container spacing={2}>
        {/* Placeholder for dog cards */}
        {[...Array(2)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" align="center">
                  Milo
                </Typography>
                <Typography variant="body2" align="center">
                  Placeholder for Dog Stats
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DogCards;