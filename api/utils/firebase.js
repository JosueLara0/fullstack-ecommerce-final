// Libraries
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APi_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp);

module.exports = { firebaseApp, firebaseStorage };
