import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app'
import { isSupported as isAnalyticsSupported } from 'firebase/analytics'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function initDb(config: FirebaseOptions) {
  const app = !getApps().length ? initializeApp(config) : getApp();

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  const db = getFirestore(app);

  // Only import and initialize Analytics if supported
  isAnalyticsSupported().then(async (supported) => {
    if (supported) {
      const { getAnalytics } = await import('firebase/analytics');
      getAnalytics(app);
      console.log('Firebase Analytics initialized');
    }
  });

  return { auth, db, app };
}
