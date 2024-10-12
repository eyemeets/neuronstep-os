import admin, { db } from '../clients/firebase'
import type { FirestoreDeleteParams, FirestoreGetParams, FirestoreUpdateParams, FirestoreWriteParams } from '../types/firestore'

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

