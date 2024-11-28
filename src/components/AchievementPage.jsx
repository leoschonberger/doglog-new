import React, { useState } from 'react';
import AddAchievementForm from './AddAchievementForm';
import AchievementList from './AchievementList';
import { Container } from '@mui/material';

const AchievementPage = () => {
  const [achievements, setAchievements] = useState([]);

  const handleAddAchievement = (newAchievement) => {
    setAchievements((prevAchievements) => [...prevAchievements, newAchievement]);
  };

  return (
    <Container>
      <AddAchievementForm onAdd={handleAddAchievement} />
      <AchievementList achievements={achievements} />
    </Container>
  );
};

export default AchievementPage;