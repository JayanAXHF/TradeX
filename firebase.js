// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZlMjOYEr6_nkvO1L0PQi7f3rFNaI6e5Y",
  authDomain: "tradex-1983a.firebaseapp.com",
  databaseURL:
    "https://tradex-1983a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tradex-1983a",
  storageBucket: "tradex-1983a.appspot.com",
  messagingSenderId: "171346920661",
  appId: "1:171346920661:web:3017b10d9e45266aca4e5c",
  measurementId: "G-59GWKSS6K8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
