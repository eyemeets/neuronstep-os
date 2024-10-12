import type { CourseObjectiveSchema, CourseOutlineSchema, CoursePlanSchema } from 'shared-types'
import { createCourseServerInstance } from './api' // Use the createServerInstance function
import { endpoints } from 'shared-constants'
type CourseAnalysisReturnParams = { plan: CoursePlanSchema; outline: CourseOutlineSchema } | null

export const analyzeCourse = async (validatedObjective: CourseObjectiveSchema): Promise<CourseAnalysisReturnParams> => {
  try {
    const course = await createCourseServerInstance()
    const response = await course.post<CourseAnalysisReturnParams>(endpoints.course.analyze, validatedObjective)

    return response.data
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error analyzing course:', err.message)
    }
    else {
      console.error('An unexpected error occurred during course analysis')
    }
    return null // Return null if there's an error
  }
}
