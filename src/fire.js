// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA1wxVs-lB_b-PNg-PHZ2EeKv5fj4XVY9k",
  authDomain: "online-learning-platform-h.firebaseapp.com",
  projectId: "online-learning-platform-h",
  storageBucket: "online-learning-platform-h.appspot.com",
  messagingSenderId: "792167168473",
  appId: "1:792167168473:web:6532c17f66c16a901c81c8",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export default app;
