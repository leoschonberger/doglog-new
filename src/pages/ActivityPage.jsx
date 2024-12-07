// ActivityPage.js
// Component to display the user's pins in chronological order

/*
 * This file contrains a wrapper conponent for the ActivityList component which displays the user's pins in chronological order.
 * 
 * Group Name: Doo Doo Data
 * 
 * Authors:
 * - Leo Schonberger
 * 
 * Component: ActivityPage
 * Description: This is just a wrapper to display the ActivityList component. It's pretty simple but exists to keep the App component clean.
 * Created by: Leo Schonberger
 * Last updated by: Leo Schonberger
 * Last updated on: 2024-12-6
 */

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