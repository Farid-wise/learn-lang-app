import { initializeApp } from "firebase/app";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "learn-lang-app-29c4a.firebaseapp.com",
  projectId: "learn-lang-app-29c4a",
  storageBucket: "learn-lang-app-29c4a.appspot.com",
  messagingSenderId: "162747922092",
  appId: "1:162747922092:web:0f397329f6898805fb5109"
};

/**
 * Initializes the Firebase application.
 *
 * @return {firebase.app.App} The initialized Firebase app instance
 */
export const initFireBaseApp = () => {
    return initializeApp(firebaseConfig);
}