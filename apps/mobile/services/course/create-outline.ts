import type { CourseObjectiveAndPlanParams, CourseObjectiveSchema, CourseOutlineSchema, CoursePlanSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../api' // Use the createServerInstance function
import { endpoints } from '@repo/shared-constants'

export const createCourseOutline = async (params: CourseObjectiveAndPlanParams): Promise<CourseOutlineSchema | null> => {
  try {
    const course = await createCourseServerInstance()
    const response = await course.post<CourseOutlineSchema>(endpoints.course.outline, params)

    return response.data
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error analyzing course:', err.message)
    }
    else {
      console.error('An unexpected error occurred during course outline')
    }
    return null // Return null if there's an error
  }
}
