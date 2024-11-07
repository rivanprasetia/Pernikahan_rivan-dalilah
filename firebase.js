import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcCpYgLx5vjUQm8zvxRgtDTRrrR0SGkG8",
    authDomain: "wedding-invitation7.firebaseapp.com",
    projectId: "wedding-invitation7",
    storageBucket: "wedding-invitation7.firebasestorage.app",
    messagingSenderId: "889581925408",
    appId: "1:889581925408:web:e7710ee3c29922322ff845"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
