// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX-F0z_cTxtDC3L_zU5c_WfqhuS6dizsk",
  authDomain: "task3-526dd.firebaseapp.com",
  projectId: "task3-526dd",
  storageBucket: "task3-526dd.appspot.com",
  messagingSenderId: "749356667893",
  appId: "1:749356667893:web:b4f3818adc2754552e06bc",
  measurementId: "G-SEZSJX05K2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);