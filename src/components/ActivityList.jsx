import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchPins } from '../services/pinService';

const ActivityList = () => {
    
    
    const [pins, setPins] = useState([]);
    const { user } = useAuth(); // Get the authenticated user
  
    // Mock fetchPins function
    const fetchPinsServer = async () => {
      // Replace this with your actual fetch API call
      const pin_data = fetchPins(user.uid);
      return pin_data;
    };
  
    // Format the value based on the key (so JS doesn't yell at me)
    const formatValue = (key, value) => {
      if (key === "timestamp" && typeof value === "object" && value.seconds && value.nanoseconds) {
        // Convert timestamp to a readable date string
        const date = new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
        return date.toLocaleString(); // Format to a readable string
      }
  
      // Ensure all other values are stringified or directly returned as valid ReactNode
      if (typeof value === "object") {
        return JSON.stringify(value); // Convert objects to strings
      }
  
      return value !== undefined && value !== null ? value.toString() : "N/A"; // Handle undefined/null
    };
  
    useEffect(() => {
      const getPins = async () => {
        if (user) {
          const data = await fetchPinsServer();
          setPins(data);
          console.log(data); // Log the data to see what it looks like. TODO: Remove this line
        }
      };
      getPins();
    }, [user]);
  
    if (!user) {
      return <Typography variant="h6">Please log in to view your pins.</Typography>;
    }
  
    return (
      <Stack spacing={2} alignItems="center">
        {pins.map((pin) => (
          <Card key={pin.id} style={{ width: 300 }}>
            <CardContent>
              {Object.entries(pin).map(([key, value]) => (
                <Typography variant="body2" key={key.toString()}>
                  <strong>{key.toString()}:</strong> {formatValue(key,value)}
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  };
  
  export default ActivityList;