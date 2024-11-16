// dogService.jsx
// Service functions for fetching dog specific information from Firestore

import { db } from '../config/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export const fetchNames = async (userId) => {
  // Function to return all of the names and IDs of the dogs that belong to a specific user
  const dogsRef = collection(db, 'dogs');
  const q = query(dogsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => [doc.id, doc.data().Name]);
};