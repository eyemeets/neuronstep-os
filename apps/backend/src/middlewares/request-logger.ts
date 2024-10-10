import type { Request, Response, NextFunction } from 'express'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Received request: ${req.method} ${req.url}`)
  next()
}
