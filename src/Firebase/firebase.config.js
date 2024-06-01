// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHYR6ERg4AW5_PZVYrCcF8WHnmVu6gq_k",
  authDomain: "lifesourcebloodbank-e806f.firebaseapp.com",
  projectId: "lifesourcebloodbank-e806f",
  storageBucket: "lifesourcebloodbank-e806f.appspot.com",
  messagingSenderId: "166067565085",
  appId: "1:166067565085:web:fd1b919c7edf4bbdc0ccf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)