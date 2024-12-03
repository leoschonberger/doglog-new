// Achievements.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const Achievements = () => {
  return (
    <Box mt={4} width="100%">
      <Typography variant="h6" align="left" gutterBottom>
        Trophy Case
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        gap="2%"
        flexWrap="wrap"
      >
        {/* Placeholder for achievements */}
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '15%',
              aspectRatio: '1/1',
              backgroundColor: '#d3d3d3',
              borderRadius: '50%',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Achievements;