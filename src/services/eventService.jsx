import { collection, query, where, orderBy, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.jsx';

/**
 * Fetch events for a specific user, ordered by timestamp in descending order.
 * @param {string} userId - The user's unique ID.
 * @returns {Array} Array of event objects.
 */
async function fetchEvents(userId) {
  try {
    const eventsRef = collection(db, 'Events');
    const q = query(
      eventsRef,
      where('user_id', '==', userId), // Adjust field name if different
      orderBy('timestamp', 'desc') // Order by timestamp in descending order
    );

    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map(doc => ({
      event_id: doc.id,
      dog_id: doc.dog_id,
      event_type: doc.event_type,
      description: doc.description,
      timestamp: doc.timestamp,
      location: doc.location,
    }));

    console.log("Fetched events:", events);

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

/**
 * Add a new event to the database.
 * @param {string} userId - The user's unique ID.
 * @param {string} dog_id - The dog's ID.
 * @param {string} event_type - Type of the event.
 * @param {string} description - Description of the event.
 * @param {string} timestamp - Timestamp of the event.
 * @param {string} location - Location of the event.
 * @returns {string|null} The document ID of the newly created event, or null if there was an error.
 */
async function setEvent(userId, dog_id=null, event_type=null, description=null, timestamp = null, location = null) {
  try {
    const eventsRef = collection(db, 'Events');
    const newEvent = {
      user_id: userId,       // Adjust field name if needed
      dog_id: dog_id,
      event_type: event_type,
      description: description,
      timestamp: timestamp,
      location: location,
    };
    
    const docRef = await addDoc(eventsRef, newEvent);
    console.log("Event added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    return null;
  }
}

/**
 * Delete an event from the database by its ID.
 * @param {string} event_id - The unique ID of the event to be deleted.
 * @returns {boolean} True if deletion was successful, false otherwise.
 */
async function deleteEvent(event_id) {
  try {
    const eventDocRef = doc(db, 'Events', event_id);
    await deleteDoc(eventDocRef);
    console.log("Event deleted with ID:", event_id);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
}

export { fetchEvents, setEvent, deleteEvent };
