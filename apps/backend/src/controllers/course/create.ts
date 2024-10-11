import type { Request, Response } from 'express'
import { createContentForCourse } from '../../services/course-creator/create'
import { processFile } from '../../services/file-processor'
import type { CurriculumObjectivePlanAndOutlineStructure } from 'shared-types'

export async function courseCreationController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(400).json({ error: 'User object is undefined' })
  }

  try {
    const file = req.file
    const params = Object.assign(req.body, { file }) as CurriculumObjectivePlanAndOutlineStructure

    if (!params) return

    const curriculumOutline = await createContentForCourse(params, req.user)

    if (curriculumOutline) {
      return res.json(curriculumOutline)
    }

    if (file) {
      const fileProcessingResult = await processFile(file)

      return res.json(fileProcessingResult)
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
