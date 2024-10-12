import admin, { db } from '../clients/firebase'
import type { FirestoreDeleteParams, FirestoreGetParams, FirestoreUpdateParams, FirestoreWriteParams } from '../types/firestore'
import { getStorage } from 'firebase-admin/storage'

/**
 * Writes data to Firestore.
 * 
 * @param {FirestoreWriteParams} params - The parameters for Firestore write operation.
 * @returns {Promise<void>} - A Promise that resolves when the write is complete.
 */
export async function writeToFirestore({
  docId,
  path,
  uid,
  data
}: FirestoreWriteParams): Promise<void> {
  const docRef = docId
    ? db.collection(path).doc(docId)
    : db.collection(path).doc()

  await docRef.set({
    ...data,
    uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true })
}

/**
 * Updates existing data in Firestore.
 * 
 * @param {FirestoreUpdateParams} params - The parameters for Firestore update operation.
 * @returns {Promise<void>} - A Promise that resolves when the update is complete.
 */
export async function updateInFirestore({
  path,
  uid,
  data
}: FirestoreUpdateParams): Promise<void> {
  const docRef = db.collection(path).doc(uid)
  
  await docRef.update({
    ...data,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })
}

/**
 * Deletes a document from Firestore.
 * 
 * @param {FirestoreDeleteParams} params - The parameters for Firestore delete operation.
 * @returns {Promise<void>} - A Promise that resolves when the delete is complete.
 */
export async function deleteFromFirestore({
  path,
  uid
}: FirestoreDeleteParams): Promise<void> {
  const docRef = db.collection(path).doc(uid)
  
  await docRef.delete()
}

/**
 * Retrieves a document from Firestore.
 * 
 * @param {FirestoreGetParams} params - The parameters for Firestore get operation.
 * @returns {Promise<FirebaseFirestore.DocumentData | undefined>} - The document data or undefined if it doesn't exist.
 */
export async function getFromFirestore({
  path,
  uid
}: FirestoreGetParams): Promise<FirebaseFirestore.DocumentData | undefined> {
  const docRef = db.collection(path).doc(uid)
  const doc = await docRef.get()

  if (!doc.exists) {
    console.log('No such document!')
    return undefined
  }

  return doc.data()
}

/**
 * Downloads an image from a given URL and uploads it to Firebase Storage.
 * 
 * @param {string} imageUrl - The URL of the image to download.
 * @param {string} path - The path where the image should be stored in Firebase Storage (e.g., users/{uid}/{objectiveId}/image.png).
 * @returns {Promise<string>} - The public URL of the uploaded image.
 */
export async function uploadImageToFirebase(imageUrl: string, path: string): Promise<string> {
  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error('Failed to download image')
    }

    // Use arrayBuffer instead of buffer()
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Reference to the Firebase Storage bucket
    const bucket = getStorage().bucket()
    const file = bucket.file(path)

    // Upload the image buffer to Firebase Storage
    await file.save(buffer, {
      metadata: {
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000'
      }
    })

    // Make the file publicly accessible
    await file.makePublic()

    // Return the public URL of the uploaded image
    return file.publicUrl()
  }
  catch (error) {
    console.error('Error uploading image to Firebase:', error)
    throw new Error('Failed to upload image')
  }
}
