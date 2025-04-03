// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore (if needed)
import { getStorage } from "firebase/storage"; // For Storage (if needed)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeOy0h78ChXF_v-spHRWAVTx_n-5u4Vtk",
  authDomain: "guitar-galaxy.firebaseapp.com",
  projectId: "guitar-galaxy",
  storageBucket: "guitar-galaxy.appspot.com",
  messagingSenderId: "315119622362",
  appId: "1:315119622362:web:ae751fc04f871ec8f56de3",
  measurementId: "G-P8927219SN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication instance
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Storage instance

export { app, auth, db, storage };
