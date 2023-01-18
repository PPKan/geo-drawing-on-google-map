// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfp3nDoHsyROjru0rsZVy6ytEEBorCRvg",
  authDomain: "tp-solar.firebaseapp.com",
  projectId: "tp-solar",
  storageBucket: "tp-solar.appspot.com",
  messagingSenderId: "401010683441",
  appId: "1:401010683441:web:d1b87efe09efb8ebcfef10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);