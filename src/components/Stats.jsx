/* 
Stats.jsx

Component that displays the statisics for each dog within their respective dog card on the profile page. 
Displays the average bathroom events per week, total pins/events created, bathroom to meal ratio, and hours
since last bathroom event. Calls functions from dogStats.jsx in services directory to calculate these statistics.
*/

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
        <Grid item xs={6} key={index}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            border={1}
            borderRadius={2}
            p={2}
            height="100px"
            textAlign="center"
            sx={{ backgroundColor: '#f5f5f5' }}
          >
            <Typography variant="body2" color="textSecondary">
              {stat.label}
            </Typography>
            <Typography variant="h6">
              {stat.value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stats;