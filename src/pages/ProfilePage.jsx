// ProfilePage.jsx

import React from 'react';
import { Box, Typography, Avatar, Container, Grid, Card, CardContent } from '@mui/material';
import { useAuth } from '../components/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ px: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {user && (
          <>
            {/* User Info Section */}
            <Avatar
              alt={user.displayName}
              src={user.photoURL}
              sx={{ width: '12.5%', height: 'auto', mb: 2 }}
            />
            <Typography variant="h5" align="center">{user.displayName}</Typography>
            <Typography variant="body1" align="center">{user.email}</Typography>
          </>
        )}

        {/* Achievements Section */}
        <Box mt={4} width="100%">
          <Typography variant="h6" align="left" gutterBottom>
            Trophy Case
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            gap="2%"
            flexWrap="wrap"
          >
            {/* Placeholder for achievements */}
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: '15%',
                  aspectRatio: '1/1',
                  backgroundColor: '#d3d3d3',
                  borderRadius: '50%',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Dog Cards Section */}
        <Box mt={4} width="100%">
          <Typography variant="h6" align="left" gutterBottom>
            Your Dogs
          </Typography>
          <Grid container spacing={2}>
            {/* Placeholder for dog cards */}
            {[...Array(2)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      Milo
                    </Typography>
                    <Typography variant="body2" align="center">
                      Placeholder for Dog Stats
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
