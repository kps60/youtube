import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAopOrX0TAmYOlo8fa5nTfi1R4EycxXTpk",
    authDomain: "social-media-app-60.firebaseapp.com",
    projectId: "social-media-app-60",
    storageBucket: "social-media-app-60.appspot.com",
    messagingSenderId: "818464594125",
    appId: "1:818464594125:web:2b9de33c2e134bb7db3184"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;