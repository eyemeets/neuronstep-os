import type { Request, Response } from 'express'
import { courseValidatorController } from '../../controllers/course/validate'

/**
 * Handles POST requests for '/api/course/validate', processing different types of input (PDF, image, text, description).
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON object with the processed content or an error message.
 */
export const post = async (req: Request, res: Response) =>
  courseValidatorController(req, res)
