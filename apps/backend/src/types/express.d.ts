// express.d.ts
import * as express from 'express'
import type admin from 'firebase-admin'

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.UserRecord // The type for the decoded token
    }
  }
}
