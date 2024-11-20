// pinService.js
// Service functions for fetching user-specific pins from Firestore

import { db } from '../config/firebase';
import { doc, collection, query, where, orderBy, getDocs, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

export const fetchPins = async (userId) => {
  const pinsRef = collection(db, 'pins');
  const q = query(pinsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addPin = async (pin) => {
  await addDoc(collection(db, 'pins'), pin);
}

export const removePin = async (userId, title) => {
  const pinsRef = collection(db, 'pins');
  const q = query(pinsRef, where('userId', '==', userId), where('title', '==', title));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const pinDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, 'pins', pinDoc.id));

  } else {
    throw new Error('Pin not found');
  }
};

export const updatePin = async (pinId, pin) => {
  const pinRef = doc(db, 'pins', pinId);
  await updateDoc(pinRef, pin);
};
