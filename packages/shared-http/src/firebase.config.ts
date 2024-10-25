import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app'
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function initDb(config: FirebaseOptions) {
  // Initialize Firebase app
  const app = !getApps().length ? initializeApp(config) : getApp()

  // Use initializeAuth directly without conditional checks
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // Set persistence
  })

  // Initialize Firestore
  const db = getFirestore(app)

  // Initialize Firebase Analytics if supported
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      getAnalytics(app)
       console.log('Firebase Analytics initialized')
    }
  })

  return { auth, db, app }
}