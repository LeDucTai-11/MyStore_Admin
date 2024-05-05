import { initializeApp } from 'firebase/app';
import appConfig from '@appConfig';

const config = {
  apiKey: appConfig.FIREBASE_API_KEY,
  authDomain: appConfig.FIREBASE_AUTH_DOMAIN,
  databaseURL: appConfig.FIREBASE_DATABASE_URL,
  projectId: appConfig.FIREBASE_PROJECT_ID,
  storageBucket: appConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: appConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: appConfig.FIREBASE_APP_ID,
  measurementId: appConfig.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(config);

export { firebaseApp };
