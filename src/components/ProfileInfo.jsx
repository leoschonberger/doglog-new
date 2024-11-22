//ProfileInfo.jsx

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useAuth } from '../components/AuthContext';

const ProfileInfo = () => {
  const { user } = useAuth();

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
              mb: 2
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