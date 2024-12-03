// This file provides the Firestore database service for the achievements collection.
// This is only for managing acheivment types by admins, not for tracking user achievements. (See userAchievementsService.jsx)

import { db } from '../config/firebase'; // Firebase initialization file
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

const achievementsCollection = collection(db, 'achievements');

/**
 * Retrieves all achievements from the achievements collection.
 * @returns {Promise<Array>} List of all achievements.
 */
export const getAchievements = async () => {
  try {
    const achievementsSnapshot = await getDocs(achievementsCollection);
    return achievementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};

/**
 * Adds a new achievement type to the achievements collection.
 * @param {Object} achievementType - The new achievement type to add.
 * Example:
 * {
 *   id: "poop_pro",
 *   name: "Poop Pro",
 *   description: "Log 50 poop spots to earn this achievement.",
 *   poopCount: 50 // Achievement criteria
 * }
 * @returns {Promise<void>}
 */
export const addAchievement = async (achievementType) => {
  try {
    const { id, name, description, ...criteria } = achievementType;

    if (!id || !name || !description) {
      throw new Error('Achievement must have an ID, name, and description.');
    }

    const achievementDocRef = doc(achievementsCollection, id);

    const existingAchievement = await getDoc(achievementDocRef);
    if (existingAchievement.exists()) {
      throw new Error('Achievement with this ID already exists.');
    }

    await setDoc(achievementDocRef, { name, description, ...criteria });
    console.log(`Achievement type '${name}' added successfully.`);
  } catch (error) {
    console.error('Error adding achievement type:', error);
    throw error;
  }
};
