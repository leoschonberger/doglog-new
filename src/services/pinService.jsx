// pinService.js
// Service functions for fetching user-specific pins from Firestore

import { db } from '../config/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export const fetchPins = async (userId) => {
  const pinsRef = collection(db, 'pins');
  const q = query(pinsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
