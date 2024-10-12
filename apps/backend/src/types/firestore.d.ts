// Define the interface for Firestore write parameters
export interface FirestoreWriteParams {
  docId?: string
  path: string // Firestore collection path
  uid: string // User UID to be used as the document ID
  data: object // Data to be written to Firestore
}

// Define the interface for Firestore update parameters
export interface FirestoreUpdateParams {
  path: string // Firestore collection path
  uid: string // User UID to be used as the document ID
  data: Partial<object> // Data to update in Firestore (can be partial)
}

// Define the interface for Firestore delete parameters
export interface FirestoreDeleteParams {
  path: string // Firestore collection path
  uid: string // User UID to be used as the document ID
}

// Define the interface for Firestore get parameters
export interface FirestoreGetParams {
  path: string // Firestore collection path
  uid: string // User UID to be used as the document ID
}
