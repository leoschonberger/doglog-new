// pinService.js

/*
 * This file contains service functions for creating, fetching, updating, and deleting (CRUD)
 * user-specific pins from Firestore.
 * 
 * Group Name: Doo Doo Data
 * 
 * Authors:
 * - Nick Johnson
 * - Sterling Miller
 * - Leo Schonberger
 * 
 * Component: pinService
 * Description: This service provides CRUD functions to interact with the Firestore database 
 *              for pin-related operations.
 * Created by: Leo Schonberger
 * Last updated by: Sterling Miller
 * Last updated on: 2024-11-20
 */

import { db } from '../config/firebase';
import { doc, collection, query, where, orderBy, getDocs, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

export const fetchPins = async (userId) => {
  const pinsRef = collection(db, 'pins');
  const q = query(pinsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const pinInputForm = async (pin) => {
  await addDoc(collection(db, 'pins'), pin);
}

export const removePin = async (userId, pinId) => {
  if (userId === null) {
    throw new Error('User Not Authenticated');

  } else {
    const pinRef = doc(db, 'pins', pinId);
    await deleteDoc(pinRef);
  }
};

export const updatePin = async (userId, pinId, pin) => {
  if (userId === null) {
    throw new Error('User Not Authenticated');

  } else {
    const pinRef = doc(db, 'pins', pinId);
    await updateDoc(pinRef, pin);
  }
};
