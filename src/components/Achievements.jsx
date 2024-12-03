// Achievements.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { useAuth } from '../components/AuthContext';
import { getUserAchievements, checkAndAddAchievements } from '../services/userAchievementsService';
import { getAchievements } from '../services/achievementsService';

const Achievements = () => {
  const { user } = useAuth();
  const [userAchievements, setUserAchievements] = useState([]);
  const [allAchievements, setAllAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        if (user) {
          // Check and add restroom achievements
          await checkAndAddAchievements(user.uid);

          const userAchievementsData = await getUserAchievements(user.uid);
          setUserAchievements(userAchievementsData);

          const allAchievementsData = await getAchievements();
          setAllAchievements(allAchievementsData);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    fetchAchievements();
  }, [user]);

  const earnedAchievements = allAchievements.filter(achievement =>
    userAchievements.some(userAchievement => userAchievement.id === achievement.id)
  );

  return (
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
        {earnedAchievements.length > 0 ? (
          earnedAchievements.map((achievement, index) => (
            <Box
              key={index}
              sx={{
                width: '15%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10px',
                border: '1px solid #d3d3d3',
                borderRadius: '8px',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  backgroundColor: '#d3d3d3',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <Tooltip title={achievement.description} arrow>
                  <img
                    src={`achievement-photos/${achievement.id}.png`} // Update this path to the actual location of your achievement photos
                    alt={achievement.name}
                    style={{
                      width: '80%',
                      height: 'auto',
                      borderRadius: '50%',
                    }}
                  />
                </Tooltip>
              </Box>
              <Typography variant="h6">{achievement.name}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No achievements earned yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Achievements;