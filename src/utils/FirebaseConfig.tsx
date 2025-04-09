// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
 import { collection,getFirestore } from "firebase/firestore"; // Uncomment if you need Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN0LPzp_EHfBisndztjBdKwaXxidBAbWM",
  authDomain: "zoom-clone-1f258.firebaseapp.com",
  projectId: "zoom-clone-1f258",
  storageBucket: "zoom-clone-1f258.firebasestorage.app",
  messagingSenderId: "478787715678",
  appId: "1:478787715678:web:a10455488722924bf32acf",
  measurementId: "G-YGKEJSS1CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth =getAuth(app);
export const firebaseDB = getFirestore(app); // Uncomment if you need Firestore

export const userRef = collection(firebaseDB, "users"); // Uncomment if you need Firestore
export const meetingsRef=collection(firebaseDB,"meetings");