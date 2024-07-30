// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB0S8--Jd_4ROu43-liKRWlWaaSunZ-j_Y",
  authDomain: "magic-world-76947.firebaseapp.com",
  projectId: "magic-world-76947", 
  storageBucket: "magic-world-76947.appspot.com",
  messagingSenderId: "1015784520868",
  appId: "1:1015784520868:web:ed6826cc85823db3793a31",
  measurementId: "G-6P1KM1W6P6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default db;  // Keep this for backward compatibility