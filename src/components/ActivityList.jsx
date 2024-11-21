import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, InputLabel, FormControl, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { fetchPins } from '../services/pinService';
import { fetchDogs } from '../services/dogService';
import { AlignCenter } from 'tabler-icons-react';
import PinActionsDropdown from './PinsActionDropdown';

const ActivityList = () => {
    
    
    const [pins, setPins] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [selectedDog, setSelectedDog] = useState("all");
    const { user } = useAuth(); // Get the authenticated user
  
    // Fetch the pins from the db
    const fetchPinsServer = async () => {
      const pin_data = fetchPins(user.uid);
      return pin_data;
    };

    // Fetch the authenticated user's dogs from db
    const getDogs = async () => {
        const dogData = fetchDogs(user.uid);
        // console.log("Dog Data: ", dogData);
        return dogData;
    }

    // Function to format the timestamp for readability. Might need to change this at some point if we store it differently
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleString();
      };

      // This function will handle the dog selection
    const handleDogSelect = (event) => {
        const selectedDogId = event.target.value;
        const dog = selectedDogId === "all" ? "all" : dogs.find((dog) => dog.id === selectedDogId);
        // console.log("Selected Dog: ", dog);
        setSelectedDog(dog); // Set the entire dog object
      };
    
      // This filters our pins based on the selected dog
      // BEWARE OF dogID vs dog.id
      const filteredPins = selectedDog === "all" ? pins : pins.filter((pin) => pin.dogID === selectedDog.id);

    // On mount, fetch the pins and dogs
    useEffect(() => {
      const fetchData = async () => {
        if (user) {
        // Make sure to get both before starting
          const [pinsData, dogsData] = await Promise.all([fetchPinsServer(), getDogs()]);
          const transformedDogs = dogsData.map(([id, name]) => ({ id, name }));
          setPins(pinsData);
          setDogs(transformedDogs);
        }
      };
      fetchData();
    }, [user]);

    // This function will update the pins state when a pin is removed
    const handlePinRemoved = (pinId) => {
      setPins(pins.filter(pin => pin.id !== pinId));
    };
  
    // This function will update the pins state when a pin is updated by re-fetching the pins from the server
    const handlePinUpdated = async () => {
      const updatedPins = await fetchPinsServer();
      setPins(updatedPins);
    };
    
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
              value={selectedDog === "all" ? "all" : selectedDog?.id || "all"} // Wonky to make sure there is always a value
              onChange={handleDogSelect}
            >
              <MenuItem value="all">
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
            <Card key={pin.id} style={{ width: "50%" , backgroundColor: "#1e1e1e", color: "white", minWidth: 400, maxWidth: 600 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    {dog.name} - {pin.event}
                  </Typography>
                  
                  <PinActionsDropdown 
                  pinId={pin.id} 
                  onPinRemoved={() => handlePinRemoved(pin.id)} 
                  onPinUpdated={handlePinUpdated} 
                />
                </Box>
                <Typography variant="caption">
                    {formatTimestamp(pin.timestamp)}
                  </Typography>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  <strong>Title: </strong> {pin.title}
                </Typography>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  <strong>Desc: </strong> {pin.description}
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