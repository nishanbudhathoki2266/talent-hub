// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBGWgoI6NhGzlU4jkuP0v4_3I9AQG2gU0",
  authDomain: "dalay-dai.firebaseapp.com",
  projectId: "dalay-dai",
  storageBucket: "dalay-dai.appspot.com",
  messagingSenderId: "89681422398",
  appId: "1:89681422398:web:6e9182b77e39513b03496f",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
