import type { Request, Response } from 'express'
import { createCourseOutline } from '../../services/course-outline'
import { processFile } from '../../services/file-processor'
import type { CourseObjectiveAndPlanParams } from '@repo/shared-types'

/**
 * Controller function to handle outline or file processing.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export const courseOutlineController = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(400).json({ error: 'User object is undefined' })
  }

  try {
    const file = req.file
    const params = Object.assign(req.body, { file }) as CourseObjectiveAndPlanParams

    if (!params) return res.status(400).json({
      error: 'No parameters provided'
    })

    const curriculumOutline = await createCourseOutline(params, req.user)

    if (curriculumOutline) {
      return res.json(curriculumOutline)
    }

    if (file) {
      const fileProcessingResult = await processFile(file)

      return res.json(fileProcessingResult)
    }

    return res.status(400).json({
      error: 'No valid input provided'
    })
  }
  
  catch (error) {
    return res.status(500)
      .json({
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      })
  }
}
