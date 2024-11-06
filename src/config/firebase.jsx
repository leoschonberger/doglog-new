import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcd1gyou-Zb_mJGgToSayDT7wbmGbamSI",

  authDomain: "godlog-e6d6b.firebaseapp.com",

  databaseURL: "https://godlog-e6d6b-default-rtdb.firebaseio.com",

  projectId: "godlog-e6d6b",

  storageBucket: "godlog-e6d6b.firebasestorage.app",

  messagingSenderId: "701051597771",

  appId: "1:701051597771:web:97dcd76c4cd260fbc6fc4e"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initiaize authentication
export const auth = getAuth(app);