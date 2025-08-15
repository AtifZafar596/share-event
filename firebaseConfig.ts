// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyssJhl_I2Fz3AGTbZCW-9YwYqGABMW_E",
  authDomain: "instant-share-e7025.firebaseapp.com",
  projectId: "instant-share-e7025",
  storageBucket: "instant-share-e7025.firebasestorage.app",
  messagingSenderId: "195043563180",
  appId: "1:195043563180:web:6f0ac5900a117d48cd7109",
  measurementId: "G-YYLPWPCECP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { analytics, app, db };
