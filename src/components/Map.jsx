// Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Container } from '@mui/material';
import { fetchPins } from '../services/pinService'; // Import the fetchPins function

// Custom icon for pins
const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Component to set the map view to the user's location
const LocationMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13); // Zoom level of 13 for close-up view
    }
  }, [map, position]);

  return position ? (
    <Marker position={position} icon={pinIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [pins, setPins] = useState([]); // State to store pins

  // Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error fetching location:', error);
        setUserLocation([51.505, -0.09]); // Default to London if location access denied
      }
    );
  }, []);


  // Fetch pins from Firestore
  useEffect(() => {
    const loadPins = async () => {
      try {
        const pinsData = await fetchPins();
        if (Array.isArray(pinsData)) {
          const validPins = pinsData
            .filter((pin) => pin.latitude && pin.longitude)
            .map((pin) => ({
              id: pin.id,
              title: pin.title || "Untitled Pin",
              latitude: pin.latitude,
              longitude: pin.longitude,
              description: pin.description || "",
            }));
          setPins(validPins);
        } else {
          console.error("Invalid pins data format");
        }
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };
    loadPins();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <MapContainer
        center={userLocation || [51.505, -0.09]} // Default center if location is not set
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Display user's current location */}
        <LocationMarker position={userLocation} />

        {/* Display pins as markers */}
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.latitude, pin.longitude]}
            icon={pinIcon}
          >
            <Popup>
              <strong>{pin.title}</strong>
              <br />
              {pin.description}
            </Popup>
          </Marker>
        ))}
        
      </MapContainer>
    </Container>
  );
};

export default Map;
