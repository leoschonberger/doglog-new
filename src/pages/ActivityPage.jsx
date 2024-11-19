// ActivityPage.js
// Component to display the user's pins in chronological order

import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchPins } from '../services/pinService';
import { fetchEvents, setEvent, deleteEvent } from '../services/eventService';

const ActivityPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (user && user.uid) {
        setLoading(true); // Set loading to true before fetching
        const fetchedEvents = await fetchEvents(user.uid);
        setEvents(fetchedEvents);
        setLoading(false); // Set loading to false after fetching
      } else {
        setLoading(false); // Set loading to false if user is not available
      }
    };
    fetchUserEvents();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

    return (
      <Box sx={{ backgroundColor: '#6F92DA', padding: 2, minHeight: '100vh' }}>
        <Box
          sx={{
            backgroundColor: '#4CB386',
            padding: 2,
            borderRadius: 2,
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          <Typography variant="h6" color="text.primary" sx={{ marginBottom: 2 }}>
            Event Card List
          </Typography>

            {/* Add a new event button */}
            <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              const newEvent = {
              dog_id: '1800',
              event_type: 'Poop',
              timestamp: 'Now!',
              description: 'Big Poop',
              };
              const savedEvent = await setEvent(user.uid, newEvent);
              setEvents([savedEvent, ...events]);
            }}
            >
            Add New Event
            </Button>

          {events.map((event, index) => (
            <Card key={index} sx={{ backgroundColor: '#FF5A5A', marginY: 1 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {(event.dog_id || 'Unknown Dog') + ' - ' + (event.event_type || 'Unknown Event')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.timestamp || 'No Timestamp'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description || 'No Description'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

export default ActivityPage;