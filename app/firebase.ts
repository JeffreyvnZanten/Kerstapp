// config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kerstapp-oauth.firebaseapp.com",
  projectId: "kerstapp-oauth",
  storageBucket: "kerstapp-oauth.firebasestorage.app",
  messagingSenderId: "177173330379",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);