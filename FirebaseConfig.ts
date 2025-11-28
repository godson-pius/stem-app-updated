// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvmPm2xq64Y0jmoz1mCW7n1p5sCVCIH0Y",
    authDomain: "ilearnstem-b8c8b.firebaseapp.com",
    projectId: "ilearnstem-b8c8b",
    storageBucket: "ilearnstem-b8c8b.firebasestorage.app",
    messagingSenderId: "992972714610",
    appId: "1:992972714610:web:736d025df77a5e193c08eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);