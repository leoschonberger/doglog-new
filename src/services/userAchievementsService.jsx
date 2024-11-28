// Achievements service to interact with the userAchievements collection in Firestore. This service provides funtions to retrieve, add, and remove achievements for a specific user. It also includes a function to check if a user has completed any new achievements based on certain criteria.

import { db } from './firebase'; // Firebase initialization file
import { collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const userAchievementsCollection = collection(db, 'userAchievements');

/**
 * Retrieves all achievements for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} List of achievements the user has earned.
 */
export const getUserAchievements = async (userId) => {
  try {
    const userAchievementsDoc = await getDoc(doc(userAchievementsCollection, userId));
    return userAchievementsDoc.exists() ? userAchievementsDoc.data().achievements : [];
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    throw error;
  }
};

/**
 * Adds a new achievement for a specific user.
 * @param {string} userId - The ID of the user.
 * @param {Object} achievement - The achievement object to add.
 * Example:
 * {
 *   id: "poop_pro",
 *   name: "Poop Pro",
 *   earnedAt: "2024-11-28T12:34:56Z" // Timestamp of when the achievement was earned
 * }
 * @returns {Promise<void>}
 */
export const addUserAchievement = async (userId, achievement) => {
  try {
    const userAchievementsRef = doc(userAchievementsCollection, userId);
    const userAchievementsDoc = await getDoc(userAchievementsRef);

    if (userAchievementsDoc.exists()) {
      const currentAchievements = userAchievementsDoc.data().achievements || [];
      await updateDoc(userAchievementsRef, {
        achievements: [...currentAchievements, achievement],
      });
    } else {
      await setDoc(userAchievementsRef, { achievements: [achievement] });
    }
  } catch (error) {
    console.error('Error adding user achievement:', error);
    throw error;
  }
};

/**
 * Removes an achievement for a specific user.
 * @param {string} userId - The ID of the user.
 * @param {string} achievementId - The ID of the achievement to remove.
 * @returns {Promise<void>}
 */
export const removeUserAchievement = async (userId, achievementId) => {
  try {
    const userAchievementsRef = doc(userAchievementsCollection, userId);
    const userAchievementsDoc = await getDoc(userAchievementsRef);

    if (userAchievementsDoc.exists()) {
      const currentAchievements = userAchievementsDoc.data().achievements || [];
      const updatedAchievements = currentAchievements.filter(
        (ach) => ach.id !== achievementId
      );

      await updateDoc(userAchievementsRef, { achievements: updatedAchievements });
    }
  } catch (error) {
    console.error('Error removing user achievement:', error);
    throw error;
  }
};

/**
 * Checks if a user has completed any new achievements and updates the database.
 * @param {string} userId - The ID of the user.
 * @param {Object} criteria - Criteria to check for completed achievements.
 * Example:
 * {
 *   poopCount: 50,          // Number of poop spots logged by the user
 *   consecutiveDays: 10,    // Number of consecutive days the user has logged activities
 *   leaderboardRank: 1      // Current leaderboard rank
 * }
 * @returns {Promise<void>}
 */
export const checkUserAchievements = async (userId, criteria) => {
  try {
    const allAchievementsSnapshot = await getDocs(collection(db, 'achievements'));
    const allAchievements = allAchievementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const completedAchievements = allAchievements.filter((achievement) =>
      Object.keys(criteria).every((key) => criteria[key] >= achievement[key])
    );

    const userAchievementsRef = doc(userAchievementsCollection, userId);
    const userAchievementsDoc = await getDoc(userAchievementsRef);
    const currentAchievements = userAchievementsDoc.exists()
      ? userAchievementsDoc.data().achievements
      : [];

    const newAchievements = completedAchievements.filter(
      (ach) => !currentAchievements.some((curr) => curr.id === ach.id)
    );

    if (newAchievements.length > 0) {
      await updateDoc(userAchievementsRef, {
        achievements: [...currentAchievements, ...newAchievements],
      });
    }
  } catch (error) {
    console.error('Error checking user achievements:', error);
    throw error;
  }
};
