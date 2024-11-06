// pinService.js
import { db } from '../config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const fetchPins = async (userId) => {
  const pinsCollection = collection(db, 'users', userId, 'pins');
  const querySnapshot = await getDocs(pinsCollection);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createPin = async (userId, pinData) => {
  const pinsCollection = collection(db, 'users', userId, 'pins');
  return await addDoc(pinsCollection, pinData);
};

export const updatePin = async (userId, pinId, updatedData) => {
  const pinRef = doc(db, 'users', userId, 'pins', pinId);
  return await updateDoc(pinRef, updatedData);
};

export const deletePin = async (userId, pinId) => {
  const pinRef = doc(db, 'users', userId, 'pins', pinId);
  return await deleteDoc(pinRef);
};
