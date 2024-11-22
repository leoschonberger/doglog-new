// ProfilePage.jsx

import React from 'react';
import { Box, Container } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import Achievements from '../components/Achievements';
import DogCards from '../components/DogCards';
import ProfileInfo from '../components/ProfileInfo';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ px: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {user && (
          <>
            {/* Profile Info Section */}
            <ProfileInfo />

            {/* Achievements Section */}
            <Achievements />

            {/* Dog Cards Section */}
            <DogCards />
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;