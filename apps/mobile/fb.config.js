import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Your Firebase configuration
export const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Use initializeAuth directly without conditional checks
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // Set persistence
});
// Initialize Firestore
const db = getFirestore(app);
// Initialize Firebase Analytics if supported
isAnalyticsSupported().then((supported) => {
    if (supported) {
        getAnalytics(app);
        console.log('Firebase Analytics initialized');
    }
});
export { auth, db, app };
