// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhAKvp2gNq4zjBh9TkdNx4EvU8tAR65QU",
  authDomain: "swiggy-fdf55.firebaseapp.com",
  projectId: "swiggy-fdf55",
  storageBucket: "swiggy-fdf55.firebasestorage.app",
  messagingSenderId: "624397345411",
  appId: "1:624397345411:web:5cf55492fb44d438fe31b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}