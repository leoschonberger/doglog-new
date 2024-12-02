// Achievements service to interact with the userAchievements collection in Firestore. This service provides funtions to retrieve, add, and remove achievements for a specific user. It also includes a function to check if a user has completed any new achievements based on certain criteria.

import { db } from '../config/firebase'; // Firebase initialization file
import { collection, doc, getDoc, updateDoc, setDoc, getDocs, query, where } from 'firebase/firestore';

const userAchievementsCollection = collection(db, 'userAchievements');
const pinsCollection = collection(db, 'pins');

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
 * Checks the number of restroom events logged by the user and adds the corresponding achievements.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<void>}
 */
export const checkAndAddRestroomAchievements = async (userId) => {
  try {
    // Fetch all pins (restroom events) for the user
    const q = query(pinsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const restroomEventCount = querySnapshot.size;

    // Define achievement criteria

    const numPoopsCriteria = [
      {
        "id": "poop1",
        "description": "You logged your first poop!",
        "poopCount": 1,
        "name": "First Poop"
      },
      {
        "id": "poop10",
        "name": "The Decalogs of Doo",
        "poopCount": 10,
        "description": "You've tracked 10 poops, you're on a roll!"
      },
      {
        "id": "poop100",
        "poopCount": 100,
        "description": "You've tracked 100 bathroom breaks! You're a legend!",
        "name": "Turd Titan"
      },
      {
        "id": "poop25",
        "poopCount": 25,
        "name": "Doo-ty Bound Legend",
        "description": "You've logged 25 poops! Po(o)p off!"
      },
      {
        "id": "poop5",
        "poopCount": 5,
        "description": "You've tracked 5 poop events! Keep it up!",
        "name": "Five-Star Stinker"
      },
      {
        "id": "poop50",
        "description": "You've logged 50 poops! Super duper duper pooper.",
        "name": "Master of the Mess",
        "poopCount": 50
      }
    ];

    // Fetch user's current achievements
    const userAchievements = await getUserAchievements(userId);

    // Check and add achievements
    for (const criteria of numPoopsCriteria) {
      if (restroomEventCount >= criteria.poopCount && !userAchievements.some(ach => ach.id === criteria.id)) {
        await addUserAchievement(userId, { ...criteria, earnedAt: new Date().toISOString() });
      }
    }
  } catch (error) {
    console.error('Error checking and adding restroom achievements:', error);
    throw error;
  }
};