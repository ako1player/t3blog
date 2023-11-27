// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { env } from "~/env.mjs";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_API_KEY,
  authDomain: env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_MSG_SENDER_ID,
  appId: env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);