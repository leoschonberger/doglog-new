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
 * Checks the user's activities and adds the corresponding achievements.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<void>}
 */
export const checkAndAddAchievements = async (userId) => {
  try {
    // Fetch all pins (restroom events) for the user
    const q = query(pinsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const restroomEventCount = querySnapshot.size;

    // Define achievement criteria
    const achievementCriteria = [
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
      },
      {
        "id": "night_owl",
        "description": "You've taken a walk or pooped between 11pm and 5am!",
        "name": "Night Owl",
        "timeRangeStart": 23,
        "timeRangeEnd": 5
      },
      {
        "id": "seven_day_streak",
        "description": "You've logged events for 7 days in a row!",
        "name": "Week of Logs",
        "streakDays": 7
      },
      {
        "id": "super_feeder",
        "description": "You've fed a single dog more than three times in one day!",
        "name": "Super Feeder",
        "feedCount": 3
      }
    ];

    // Fetch user's current achievements
    const userAchievements = await getUserAchievements(userId);

    // Check and add achievements
    for (const criteria of achievementCriteria) {
      if (criteria.poopCount && restroomEventCount >= criteria.poopCount && !userAchievements.some(ach => ach.id === criteria.id)) {
        await addUserAchievement(userId, { ...criteria, earnedAt: new Date().toISOString() });
      }

      if (criteria.timeRangeStart && criteria.timeRangeEnd) {
        console.log('Checking night owl achievement');
        const nightOwlAchievement = querySnapshot.docs.some(doc => {
          const timestamp = doc.data().timestamp.toDate();
          const hours = timestamp.getHours();
          return (hours >= criteria.timeRangeStart || hours < criteria.timeRangeEnd);
        });

        if (nightOwlAchievement && !userAchievements.some(ach => ach.id === criteria.id)) {
          await addUserAchievement(userId, { ...criteria, earnedAt: new Date().toISOString() });
        }
      }

      if (criteria.streakDays) {
        const dates = querySnapshot.docs.map(doc => doc.data().timestamp.toDate().toDateString());
        const uniqueDates = [...new Set(dates)];
        uniqueDates.sort((a, b) => new Date(a) - new Date(b));

        let streak = 1;
        for (let i = 1; i < uniqueDates.length; i++) {
          const prevDate = new Date(uniqueDates[i - 1]);
          const currDate = new Date(uniqueDates[i]);
          const diffTime = Math.abs(currDate - prevDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            streak++;
            if (streak >= criteria.streakDays && !userAchievements.some(ach => ach.id === criteria.id)) {
              await addUserAchievement(userId, { ...criteria, earnedAt: new Date().toISOString() });
              break;
            }
          } else {
            streak = 1;
          }
        }
      }

      if (criteria.feedCount) {
        const feedEvents = querySnapshot.docs.filter(doc => doc.data().event === 'Meal');
        const feedCounts = {};

        feedEvents.forEach(doc => {
          const data = doc.data();
          const date = data.timestamp.toDate().toDateString();
          const dogId = data.dogId;

          if (!feedCounts[dogId]) {
            feedCounts[dogId] = {};
          }

          if (!feedCounts[dogId][date]) {
            feedCounts[dogId][date] = 0;
          }

          feedCounts[dogId][date]++;
        });

        const superFeederAchievement = Object.values(feedCounts).some(dogFeeds =>
          Object.values(dogFeeds).some(count => count > criteria.feedCount)
        );

        if (superFeederAchievement && !userAchievements.some(ach => ach.id === criteria.id)) {
          await addUserAchievement(userId, { ...criteria, earnedAt: new Date().toISOString() });
        }
      }
    }
  } catch (error) {
    console.error('Error checking and adding achievements:', error);
    throw error;
  }
};