import React, { useEffect, useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchPins } from '../services/pinService';
import { fetchDogs } from '../services/dogService';

const ActivityList = () => {
    
    
    const [pins, setPins] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [selectedDog, setSelectedDog] = useState(null);
    const { user } = useAuth(); // Get the authenticated user
  
    // Mock fetchPins function
    const fetchPinsServer = async () => {
      // Replace this with your actual fetch API call
      const pin_data = fetchPins(user.uid);
      return pin_data;
    };

    const getDogs = async () => {
        const dogData = fetchDogs(user.uid);
        console.log("Dog Data: ", dogData);
        return dogData;
    }
  
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

    const handleDogSelect = (event) => {
        const selectedDogId = event.target.value;
        const dog = dogs.find((dog) => dog.id === selectedDogId) || null;
        console.log("Selected Dog: ", dog);
        setSelectedDog(dog); // Set the entire dog object
      };
    
      const filteredPins = selectedDog
        ? pins.filter((pin) => pin.dogID === selectedDog.id) // Use selectedDog.id to filter pins
        : pins;
    
      if (!user) {
        return <Typography variant="h6">Please log in to view your pins.</Typography>;
      }
    
      return (
        <div>
          <FormControl style={{ margin: "1rem", minWidth: 200 }}>
            <InputLabel>Dog</InputLabel>
            <Select
              value={selectedDog ? selectedDog.id : ""}
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
            {filteredPins.map((pin) => (
              <Card key={pin.id} style={{ width: 300 }}>
                <CardContent>
                  {Object.entries(pin).map(([key, value]) => (
                    <Typography variant="body2" key={key}>
                      <strong>{key}:</strong> {formatValue(key, value)}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </div>
    );
  };
  
  export default ActivityList;