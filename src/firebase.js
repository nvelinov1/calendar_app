import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCLSCDblMxX9_3p8qS0pzcCtpVNdzfhNRA",
  authDomain: "calendar-app-351c4.firebaseapp.com",
  projectId: "calendar-app-351c4",
  storageBucket: "calendar-app-351c4.appspot.com",
  messagingSenderId: "917157840280",
  appId: "1:917157840280:web:2396d8f0c87bddb8d417ed"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

