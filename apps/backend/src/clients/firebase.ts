import admin from 'firebase-admin'
import * as serviceAccount from '../../../../firebase-adminsdk.json' // Adjust the path as needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  })
}

export default admin
