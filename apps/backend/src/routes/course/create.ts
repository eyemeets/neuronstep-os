import type { Request, Response } from 'express'
import { courseCreationController } from '../../controllers/course/create'

/**
 * Handles POST requests for '/course/create', processing different types of input (PDF, image, text, description).
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON object with the processed content or an error message.
 */
export const post = async (req: Request, res: Response) => courseCreationController(req, res) 
