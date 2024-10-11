import type { Request, Response } from 'express'
import { validateLearningObjective } from '../../services/course-objective/objective'
import { processFile } from '../../services/file-processor'
import { CurriculaSubmissionType, type ValidateObjectiveUserData } from 'shared-types'

/**
 * Controller function to handle user query and do analysis and prepare for the course.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export const courseObjectiveController = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(400).json({ error: 'User object is undefined' })
  }

  try {
    const file = req.file
    const params = Object.assign(req.body, { file }) as ValidateObjectiveUserData
    
    // Parse and validate the objective using the helper function
    const validatedObjective = parseAndValidateObjective(params)

    // If the objective is invalid, return a 400 response
    if (!validatedObjective) {
      return res.status(400).json({ reason: 'No objective was given or it was invalid', error: 'Invalid input provided' })
    }

    if (validatedObjective) {
      // Handle description text and pass the userRecord instead of req.user
      const response = await validateLearningObjective(params, CurriculaSubmissionType.TEXT, req.user)

      if (!response) return res.status(400).json({ reason: response, error: 'Invalid input provided' })
      
      return res.json(response)
    }

    if (file) {
      const fileProcessingResult = await processFile(file)

      res.write(JSON.stringify(fileProcessingResult)) // Stream file processing results if needed
      res.end() // End the response for file processing
    }

    return res.status(400).json({ error: 'No valid input provided' })
  }
  catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Server error', details: error.message })
    }
    
    return res.status(500).json({ error: 'Server error', details: 'Unknown error occurred' })
  }
}

/**
 * Helper function to parse and validate the objective.
 * It removes unnecessary quotes, trims whitespace, and checks for validity.
 * @param objective - The objective string to be validated
 * @returns {string | null} - The valid parsed objective or null if invalid
 */
function parseAndValidateObjective(params: ValidateObjectiveUserData): string | null {
  if (!params.objective || typeof params.objective !== 'string') {
    return null
  }

  // Handle case where objective is surrounded by extra quotes or malformed
  let parsedObjective = params.objective

  try {
    // If objective is wrapped in extra quotes like '""', use JSON.parse to clean it up
    parsedObjective = JSON.parse(params.objective)
  }
  catch (e) {
    // If not valid JSON, continue with the original value
    parsedObjective = params.objective
  }

  // Trim whitespace from the objective
  parsedObjective = parsedObjective.trim()

  // Return null if objective is empty after trimming
  if (parsedObjective.length === 0) {
    return null
  }

  // Return null if objective exceeds the character limit
  const MAX_CHAR_LIMIT = 4000

  if (parsedObjective.length > MAX_CHAR_LIMIT) {
    return null
  }

  // Return the validated and parsed objective
  return parsedObjective
}
