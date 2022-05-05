// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcewCMcD4OwiYvBdEtE3qevHlfHHPmdgE",
    authDomain: "webdev-adventure-project.firebaseapp.com",
    projectId: "webdev-adventure-project",
    storageBucket: "webdev-adventure-project.appspot.com",
    messagingSenderId: "226087746489",
    appId: "1:226087746489:web:cfb7c710bb61b97e565468",
    measurementId: "G-VHRTYQJ9CQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;