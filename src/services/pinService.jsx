// pinService.js
// Service functions for fetching user-specific pins from Firestore

import { db } from '../config/firebase';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';

export const fetchPins = async (userId) => {
  const pinsRef = collection(db, 'pins');
  const q = query(pinsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addPin = async (pin) => {
  await addDoc(collection(db, 'pins'), pin);
}

export const deletePin = async (pinId) => {
  await deleteDoc(doc(db, 'pins', pinId));
}

export const updatePin = async (pinId, pin) => {
  await setDoc(doc(db, 'pins', pinId), pin);
}