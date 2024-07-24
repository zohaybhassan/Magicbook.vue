// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0S8--Jd_4ROu43-liKRWlWaaSunZ-j_Y",
  authDomain: "magic-world-76947.firebaseapp.com",
  projectId: "magic-world-76947", 
  storageBucket: "magic-world-76947.appspot.com",
  messagingSenderId: "1015784520868",
  appId: "1:1015784520868:web:ed6826cc85823db3793a31",
  measurementId: "G-6P1KM1W6P6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
export const auth=getAuth();