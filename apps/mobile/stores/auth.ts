// stores/auth.ts
import { create } from 'zustand'
import type { User } from 'firebase/auth'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/fb.config'

interface CustomUser {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthState {
  user: CustomUser | null
  loading: boolean
  setUser: (user: CustomUser | null) => void
  signOutUser: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  signOutUser: async () => {
    try {
      await signOut(auth)
      set({ user: null, loading: false })
      return true
    }
    catch (error) {
      console.error('Error signing out:', error)
      return false
    }
  }
}))

// Listen to Firebase auth state changes and update the store accordingly
export const listenToAuthChanges = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // If user is authenticated, set the user
      useAuthStore.getState().setUser(user)
    }
    else {
      // If not authenticated, set user to null
      useAuthStore.getState().signOutUser()
    }
  })
}
