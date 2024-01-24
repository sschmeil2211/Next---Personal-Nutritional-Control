// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATzUpFa2MCcC5CR4-DVTzvtWTeW0bvJwg",
  authDomain: "personal-nutrition-control.firebaseapp.com",
  databaseURL: "https://personal-nutrition-control-default-rtdb.firebaseio.com",
  projectId: "personal-nutrition-control",
  storageBucket: "personal-nutrition-control.appspot.com",
  messagingSenderId: "797970486297",
  appId: "1:797970486297:web:fc2d6364f3a0c065298688",
  measurementId: "G-CRY2HGGG9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app); 