// ActivityPage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText, Divider } from '@mui/material';
import { db } from '../config/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useAuth } from '../components/AuthContext';

const ActivityPage = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [pins, setPins] = useState([]);

  useEffect(() => {
    // Fetch the user's pins in chronological order
    const fetchUserPins = async () => {
      if (!user) return;
      try {
        const pinsRef = collection(db, 'pins');
        const q = query(
          pinsRef,
          where('userId', '==', user.uid), // Ensure only the user's pins are fetched
          orderBy('timestamp', 'desc') // Sort by timestamp in descending order
        );
        const querySnapshot = await getDocs(q);
        const userPins = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Pin", // Default title if missing
            latitude: data.latitude ?? 0, // Default latitude
            longitude: data.longitude ?? 0, // Default longitude
            timestamp: data.timestamp || { seconds: Date.now() / 1000 }, // Default timestamp
          };
        });
        setPins(userPins);
      } catch (error) {
        console.error('Error fetching user pins:', error);
      }
    };

    fetchUserPins();
  }, [user]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your Activity
        </Typography>
        {pins.length > 0 ? (
          <List>
            {pins.map((pin) => (
              <React.Fragment key={pin.id}>
                <ListItem>
                  <ListItemText
                    primary={pin.title}
                    secondary={`Location: (${pin.latitude}, ${pin.longitude}) - ${new Date(pin.timestamp.seconds * 1000).toLocaleString()}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No pins found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ActivityPage;
