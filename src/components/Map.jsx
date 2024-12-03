// Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Container } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import PinInputForm from './PinInputForm';
import { FileX } from 'tabler-icons-react';

// Custom icon for pins
const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Custom icon for pins
const userLocationpin = new L.Icon({
  iconUrl: 'https://static.thenounproject.com/png/1417883-200.png',
  iconSize: [60, 60],
  iconAnchor: [30, 50],
  popupAnchor: [1, -34],
});

const selectionMarker = new L.Icon({
  iconUrl: 'https://as2.ftcdn.net/v2/jpg/07/03/39/19/1000_F_703391990_vpMHPTgtS95mDeLo3frkw9iJDO5EIoZp.webp',
  iconSize: [60, 60],
  iconAnchor: [30, 50],
  popupAnchor: [1, -34],
}
)

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
        setUserLocation([44.042265, -123.074378]);
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

  // Component to handle map events
  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
      <MapContainer
        center={userLocation || [44.042265, -123.074378]}
        zoom={13}
        style={{ height: '70vh', width: '100%', marginTop: '30px', marginLeft: '1vw' }}
        position={'absolute'}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <LocationMarker position={userLocation} />
        <MapClickHandler />

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
          <Marker position={clickedLocation} icon={selectionMarker}>
            {/* <Popup>
              <PinInputForm
                clickedLocation={clickedLocation}
                onPinAdded={() => {
                  onPinAdded();
                  setClickedLocation(null);
                }}
              />
            </Popup> */}
          </Marker>
        )}
      </MapContainer>
  );
};

export default Map;
