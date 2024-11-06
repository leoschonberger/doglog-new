// ActivityPage.js
// Component to display the user's pins in chronological order

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchPins } from '../services/pinService';

const ActivityPage = () => {
  const { user } = useAuth();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchUserPins = async () => setPins(await fetchPins(user.uid));
    fetchUserPins();
  }, [user]);

  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h5">Your Activity</Typography>
        {pins.length > 0 ? (
          <List>{pins.map((pin) => (
            <React.Fragment key={pin.id}>
              <ListItem>
                <ListItemText primary={pin.title} secondary={`Location: (${pin.latitude}, ${pin.longitude})`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}</List>
        ) : (
          <Typography>No pins found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ActivityPage;
