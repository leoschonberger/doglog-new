// ProfileInfo.jsx
// This file contains the ProfileInfo component which displays the user's profile information including their avatar, name, and email.

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useAuth } from '../components/AuthContext';

// ProfileInfo component
const ProfileInfo = () => {
  const { user } = useAuth(); // Get the authenticated user from the AuthContext

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {user && (
        <>
          <Avatar
            alt={user.displayName}
            src={user.photoURL}
            sx={{
              width: '20%', // Percentage width
              height: 'auto', // Maintain aspect ratio
              mb: 2 // Margin bottom
            }}
          />
          <Typography variant="h5" align="center">{user.displayName}</Typography>
          <Typography variant="body1" align="center">{user.email}</Typography>
        </>
      )}
    </Box>
  );
};

export default ProfileInfo;