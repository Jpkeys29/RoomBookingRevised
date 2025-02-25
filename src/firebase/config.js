// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // apiKey: "AIzaSyAHR_2y554dKc3HGjD5nVYVwBdXXble4vg",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_AUTH_PROJECT_ID,
  storageBucket: import.meta.env.VITE_AUTH_storageBucket,
  messagingSenderId: import.meta.env.VITE_AUTH_messagingSenderId,
  appId: import.meta.env.VITE_AUTH_appId,
  measurementId: import.meta.env.VITE_AUTH_measurementId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
