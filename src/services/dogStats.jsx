/*
dogStats.jsx

Service functions for calculating dog statistics based on the events associated with a dog.
Functions include calculating the average bathroom events per week, total events, bathroom to meal ratio
and time since last bathroom event.
*/
import { fetchPins } from './dogService';

// Function to fetch all events for a specific dog
const fetchDogEvents = async (dogId) => {
  const events = await fetchPins(dogId);
  return events;
};

// Function to calculate the average bathroom events in a week
export const averageBathroomEventsPerWeek = async (dogId) => {
  const events = await fetchDogEvents(dogId);
  const bathroomEvents = events.filter(event => event.event === 'Restroom');
  if (bathroomEvents.length === 0) return 0;

  const weeks = new Set(bathroomEvents.map(event => {
    const date = new Date(event.timestamp.seconds * 1000);
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    return startOfWeek.toISOString();
  }));

  const avgBathroomPerWk = bathroomEvents.length / weeks.size;
  return parseFloat(avgBathroomPerWk.toFixed(2));
};

// Function to calculate the total number of events
export const totalEvents = async (dogId) => {
  const events = await fetchDogEvents(dogId);
  return events.length;
};

// Function to calculate the bathroom to meal ratio
export const bathroomToMealRatio = async (dogId) => {
  const events = await fetchDogEvents(dogId);
  const bathroomEvents = events.filter(event => event.event === 'Restroom').length;
  const mealEvents = events.filter(event => event.event === 'Meal').length;
  const ratio = mealEvents === 0 ? bathroomEvents : bathroomEvents / mealEvents;
  return parseFloat(ratio.toFixed(2));
};

// Function to calculate the time since the last bathroom event
export const timeSinceLastBathroomEvent = async (dogId) => {
    const events = await fetchDogEvents(dogId);
    const bathroomEvents = events.filter(event => event.event === 'Restroom');
    if (bathroomEvents.length === 0) return 0;
    if (bathroomEvents.length === 0) return null;
    const lastBathroomEvent = new Date(Math.max(...bathroomEvents.map(event => event.timestamp.seconds * 1000)));
    const now = new Date();
    const hrsSinceLast = Math.floor((now - lastBathroomEvent) / (1000 * 60 * 60)); // Return the difference in hours
    return parseFloat(hrsSinceLast.toFixed(2));
  };