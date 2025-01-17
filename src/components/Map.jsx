// Map.jsx
// This file contains the Map component which displays a map using Leaflet, handles user location, and allows users to add pins.

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Container } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import PinInputForm from './PinInputForm';

// Custom icon for pins
const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Custom icon for user location
const userLocationpin = new L.Icon({
  iconUrl: 'https://static.thenounproject.com/png/1417883-200.png',
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
      map.setView(position, 13);
    }
  }, [map, position]);

  return position ? (
    <Marker position={position} icon={userLocationpin}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

// Component to handle map events
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });
  return null;
};

const Map = ({ pins, onMapClick, onPinAdded }) => {
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);

  // Fetch user location when the component mounts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error fetching location:', error);
        setUserLocation([44.042265, -123.074378]); // Default location if geolocation fails
      }
    );
  }, []);

  // Handle map click event
  const handleMapClick = (e) => {
    setClickedLocation(e.latlng);
    if (onMapClick) {
      onMapClick(e.latlng);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <MapContainer
        center={userLocation || [44.042265, -123.074378]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <LocationMarker position={userLocation} />
        <MapClickHandler onMapClick={handleMapClick} />

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

        {clickedLocation && (
          <Marker position={clickedLocation} icon={pinIcon}>
            <Popup>
              <PinInputForm
                clickedLocation={clickedLocation}
                onPinAdded={() => {
                  onPinAdded();
                  setClickedLocation(null);
                }}
              />
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </Container>
  );
};

export default Map;