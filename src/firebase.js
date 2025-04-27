// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth for Firebase Authentication
import { getDatabase, ref, push, remove, set, onValue, update } from "firebase/database";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyApOeqHia2T0eIjq9P9GJx7ADqLwjfU4pw",
  authDomain: "deafmute-6be1a.firebaseapp.com",
  databaseURL: "https://deafmute-6be1a-default-rtdb.firebaseio.com",
  projectId: "deafmute-6be1a",
  storageBucket: "deafmute-6be1a.firebasestorage.app",
  messagingSenderId: "1015536886471",
  appId: "1:1015536886471:web:7a6446cca4627b2ca7d4e2",
  measurementId: "G-V31LSWSXH6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

export { auth, app, database, ref, push, set, onValue, remove, update };  // Export auth as well
