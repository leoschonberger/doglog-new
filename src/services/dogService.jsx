// dogService.jsx
// Service functions for fetching dog specific information from Firestore

import { db } from '../config/firebase';
import { collection, query, where, orderBy, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const fetchDogs = async (userId) => {
  // Function to return tuple of (ID, name) of the dogs that belong to a specific user (userID)
  const dogsRef = collection(db, 'dogs');
  const q = query(dogsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => [doc.id, doc.data().Name]);
};

export const fetchDog = async (dogId) => {
  // Function to return the dog document with the given dogID
  const dogRef = doc(db, 'dogs', dogId);
  const dogDoc = await getDoc(dogRef);
  return dogDoc;
}

export const fetchPins = async (dogID) => {
  // Function will return all pins associated with a dog/dogID
  const pinsRef = collection(db, 'pins');
  const q = query(pinsRef, where('dogID', '==', dogID), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const addDog = async (userID, dog) => {
  // Function to add a dog to the database.
  const dogWithUserId = {
    ...dog,
    userId: userID,
  };
  await addDoc(collection(db, 'dogs'), dogWithUserId);
};

export const updateDog = async (userId, dogId, dog) => {
  if (userId === null) {
    throw new Error('User Not Authenticated');

  } else {
    const dogRef = doc(db, 'dogs', dogId);
    await updateDoc(dogRef, dog);
  }
};

export const removeDog = async (userId, dogId) => {
  if (userId === null) {
    throw new Error('User Not Authenticated');

  } else {
    const dogRef = doc(db, 'dogs', dogId);
    await deleteDoc(dogRef);
  }
};
