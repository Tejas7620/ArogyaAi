import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDEPgEW3Y2reIfYNmA9-LUWKKdlxumJRDw",
    authDomain: "pro4-8471f.firebaseapp.com",
    projectId: "pro4-8471f",
    storageBucket: "pro4-8471f.firebasestorage.app",
    messagingSenderId: "359413390381",
    appId: "1:359413390381:web:123ed7eea6cf0886caaca4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();