import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addAchievement } from '../services/achievementsService'; // Import the function to add achievements

const AddAchievementForm = ({ onAdd }) => {
  const [achievement, setAchievement] = useState({
    id: '',
    name: '',
    description: '',
    poopCount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievement({ ...achievement, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAchievement = {
        ...achievement,
        poopCount: parseInt(achievement.poopCount, 10), // Convert poopCount to a number
      };
      await addAchievement(newAchievement);
      onAdd(newAchievement); // Notify parent about the new achievement
      setAchievement({ id: '', name: '', description: '', poopCount: '' }); // Reset form
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Add New Achievement</Typography>
      <TextField
        label="ID"
        name="id"
        value={achievement.id}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Name"
        name="name"
        value={achievement.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={achievement.description}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Poop Count"
        name="poopCount"
        value={achievement.poopCount}
        onChange={handleChange}
        type="number"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">Add Achievement</Button>
    </Box>
  );
};

export default AddAchievementForm;
