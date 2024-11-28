import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const AchievementList = ({ achievements }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Achievement List</Typography>
      {achievements.length === 0 ? (
        <Typography>No achievements added yet.</Typography>
      ) : (
        <List>
          {achievements.map((achievement) => (
            <ListItem key={achievement.id} sx={{ borderBottom: '1px solid #ccc' }}>
              <ListItemText
                primary={achievement.name}
                secondary={
                  <>
                    <Typography>Description: {achievement.description}</Typography>
                    <Typography>Poop Count: {achievement.poopCount}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AchievementList;
