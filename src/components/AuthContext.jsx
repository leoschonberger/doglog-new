// AuthContext.js
/*
 * This file contains the AuthContext component which provides authentication state to the app.
 * 
 * Group Name: Doo Doo Data
 * 
 * Authors:
 * - Leo Schonberger
 * 
 * Component: AuthContext
 * Description: This is a wraper component for our app that provides authentication state to the app. It uses the Firebase onAuthStateChanged method to listen for changes in the user's authentication state. It then provides the user object to the app through the AuthContext.Provider component. We use the "user" obeject to determine if the user is authenticated and to get the user's ID for fetching data.
 * Created by: Leo Schonberger
 * Last updated by: Leo Schonberger
 * Last updated on: 2024-12-6
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

// Create a context for authentication
const AuthContext = createContext();

// Provider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for changes in the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
