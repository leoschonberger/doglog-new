// ActivityPage.js
// Component to display the user's pins in chronological order

import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchPins } from '../services/pinService';
import ActivityList from '../components/ActivityList';


const ActivityPage = () => {
  const { user } = useAuth();

  return (
    <Box padding={3}>
      <ActivityList />
    </Box>
  );
};

export default ActivityPage;