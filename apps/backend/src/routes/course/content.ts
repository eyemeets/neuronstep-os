import type { Request, Response } from 'express'
import { courseContentController } from '../../controllers/course/content'

/**
 * Handles POST requests for '/course/content', processing different types of input (PDF, image, text, description).
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON object with the processed content or an error message.
 */
export const post = async (req: Request, res: Response) => courseContentController(req, res) 
