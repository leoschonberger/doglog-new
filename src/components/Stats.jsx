// Stats.jsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Stats = ({ stats }) => {
  const statItems = [
    { label: 'Avg Bathroom Events/Wk', value: stats.AvgBathroomPerWk },
    { label: 'Total Pins', value: stats.TotalEvents },
    { label: 'Bathroom to Meal Ratio', value: stats.BathroomToMealRatio },
    { label: 'Hrs Since Bathroom', value: stats.TimeSinceLastBathroom },
  ];

  return (
    <Grid container spacing={1} mt={2}>
      {statItems.map((stat, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            border={1}
            borderRadius={2}
            p={2}
            textAlign="center"
          >
            <Typography variant="h6">{stat.value}</Typography>
            <Typography variant="body2" color="textSecondary">{stat.label}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stats;