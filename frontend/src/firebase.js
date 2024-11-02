// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_api_key,
  authDomain: "music2-0.firebaseapp.com",
  projectId: "music2-0",
  storageBucket: "music2-0.firebasestorage.app",
  messagingSenderId: "61711169770",
  appId: "1:61711169770:web:e3cdbd9f779d7398b67f93",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
