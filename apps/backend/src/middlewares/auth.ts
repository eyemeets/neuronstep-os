import type { Request, Response, NextFunction } from 'express'
import admin from '../clients/firebase'

// Array of route patterns that require authentication (using regular expressions)
const authenticatedRoutes: RegExp[] = [ /^\/course\/.*$/, /^\/user\/.*$/ ]

// Middleware to authenticate and authorize users based on idToken
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const isAuthRoute = authenticatedRoutes.some((routePattern) => routePattern.test(req.path))

  // If the route doesn't require authentication, proceed without checking token
  if (!isAuthRoute) {
    return next()
  }

  const idToken = req.headers.authorization?.split('Bearer ')[1]

  if (!idToken) {
    return res.status(401).send({ message: 'Unauthorized: No token provided' })
  }

  try {
    // Verify the token using Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    req.user = decodedToken // Attach the decoded token to the request object (contains uid, etc.)
    next() // Continue to the next middleware or route handler
  }
  catch (error) {
    console.error('Error verifying token:', error)
    return res.status(401).send({ message: 'Unauthorized: Invalid token' })
  }
}
