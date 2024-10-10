import { useState } from 'react'
import { collection, addDoc as firestoreAddDoc, updateDoc as firestoreUpdateDoc, deleteDoc as firestoreDeleteDoc, getDoc as firestoreGetDoc, doc } from 'firebase/firestore'
import { db } from '@/fb.config'

export const useFirestore = () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState<Error | null>(null) // Error type added

  // Add a document to Firestore
  const addDoc = async (collectionName: string, data: object) => {
    try {
      setLoading(true)
      const docRef = await firestoreAddDoc(collection(db, collectionName), data)

      return docRef
    }
    catch (err) {
      if (err instanceof Error) {
        setError(err) // Safely setting error as Error type
      }
      else {
        setError(new Error('Unknown error')) // Handle unknown errors
      }
    }
    finally {
      setLoading(false)
    }
  }

  // Update a document in Firestore
  const updateDoc = async (collectionName: string, docId: string, data: object) => {
    try {
      setLoading(true)
      const docRef = doc(db, collectionName, docId)

      await firestoreUpdateDoc(docRef, data)
      return docRef
    }
    catch (err) {
      if (err instanceof Error) {
        setError(err)
      }
      else {
        setError(new Error('Unknown error'))
      }
    }
    finally {
      setLoading(false)
    }
  }

  // Delete a document from Firestore
  const deleteDoc = async (collectionName: string, docId: string) => {
    try {
      setLoading(true)
      const docRef = doc(db, collectionName, docId)

      await firestoreDeleteDoc(docRef)
    }
    catch (err) {
      if (err instanceof Error) {
        setError(err)
      }
      else {
        setError(new Error('Unknown error'))
      }
    }
    finally {
      setLoading(false)
    }
  }

  // Get a document from Firestore
  const getDoc = async (collectionName: string, docId: string) => {
    try {
      setLoading(true)
      const docRef = doc(db, collectionName, docId)
      const docSnap = await firestoreGetDoc(docRef)

      return docSnap.exists() ? docSnap.data() : null
    }
    catch (err) {
      if (err instanceof Error) {
        setError(err)
      }
      else {
        setError(new Error('Unknown error'))
      }
    }
    finally {
      setLoading(false)
    }
  }

  return { addDoc, updateDoc, deleteDoc, getDoc, loading, error }
}
