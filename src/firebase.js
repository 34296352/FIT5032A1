
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBnEu6Hj97b6MuS26WlDVEpJ7UZgdbFoFc",
  authDomain: "a1requirement.firebaseapp.com",
  projectId: "a1requirement",
  storageBucket: "a1requirement.appspot.com",
  messagingSenderId: "771390620438",
  appId: "1:771390620438:web:f3231cb6f713fb5dd687d7"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}
