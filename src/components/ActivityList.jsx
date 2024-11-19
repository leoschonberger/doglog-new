import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, InputLabel, FormControl, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchPins } from '../services/pinService';
import { fetchDogs } from '../services/dogService';
import { AlignCenter } from 'tabler-icons-react';

const ActivityList = () => {
    
    
    const [pins, setPins] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [selectedDog, setSelectedDog] = useState(null);
    const { user } = useAuth(); // Get the authenticated user
  
    // Fetch the pins from the db
    const fetchPinsServer = async () => {
      const pin_data = fetchPins(user.uid);
      return pin_data;
    };

    // Fetch the authenticated user's dogs from db
    const getDogs = async () => {
        const dogData = fetchDogs(user.uid);
        console.log("Dog Data: ", dogData);
        return dogData;
    }
  
    // Format the value based on the key (so JS doesn't yell at me)
    // Mostly for timestamps
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

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleString();
      };
  
    useEffect(() => {
      const fetchData = async () => {
        if (user) {
          const [pinsData, dogsData] = await Promise.all([fetchPinsServer(), getDogs()]);
          const transformedDogs = dogsData.map(([id, name]) => ({ id, name }));
          setPins(pinsData);
          setDogs(transformedDogs);
        }
      };
      fetchData();
    }, [user]);

    // This function will handle the dog selection
    const handleDogSelect = (event) => {
        const selectedDogId = event.target.value;
        const dog = dogs.find((dog) => dog.id === selectedDogId) || null;
        console.log("Selected Dog: ", dog);
        setSelectedDog(dog); // Set the entire dog object
      };
    
      // This filters our pins based on the selected dog
      const filteredPins = selectedDog
        ? pins.filter((pin) => pin.dogID === selectedDog.id) // Use selectedDog.id to filter pins
        : pins;
    
    // If the user is not logged in, display a message
    // We can probably update this to be something more user-friendly
      if (!user) {
        return <Typography variant="h6">Please log in to view your pins.</Typography>;
      }
    
      return (
        <div>
          <FormControl style={{ margin: "1rem", minWidth: 200 }}>
            <InputLabel>Dog</InputLabel>
            <Select
              value={selectedDog ? selectedDog.id : "All Dogs"}
              onChange={handleDogSelect}
            >
              <MenuItem value="">
                <em>All Dogs</em>
              </MenuItem>
              {dogs.map((dog) => (
                <MenuItem key={dog.id} value={dog.id}>
                  {dog.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack spacing={2} alignItems="center">
          {filteredPins.map((pin) => {
          const dog = dogs.find((dog) => dog.id === pin.dogID) || { name: "Unknown" };
          return (
            <Card key={pin.id} style={{ width: 400, border: "1px solid white", borderRadius: "8px", backgroundColor: "#1e1e1e", color: "white" }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    {dog.name} - {pin.event}
                  </Typography>
                  <Typography variant="caption">
                    {formatTimestamp(pin.timestamp)}
                  </Typography>
                </Box>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  <strong>Title:</strong> {pin.title}
                </Typography>
                <Typography variant="body2" style={{ marginTop: "5px" }}>
                <strong>Desc:</strong>{pin.description}
                </Typography>
                <Typography variant="caption" style={{ marginTop: "10px", display: "block" }}>
                  Location: ({pin.latitude}, {pin.longitude})
                </Typography>
              </CardContent>
            </Card>
          );
        })}
          </Stack>
        </div>
    );
  };
  
  export default ActivityList;