import type { CourseObjectiveSchema, CoursePlanSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../api' // Use the createServerInstance function
import { endpoints } from '@repo/shared-constants'

export const createCoursePlan = async (objective: CourseObjectiveSchema): Promise<CoursePlanSchema | null> => {
  try {
    const course = await createCourseServerInstance()
    const response = await course.post<CoursePlanSchema>(endpoints.course.plan, objective)

    return response.data
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error analyzing course:', err.message)
    }
    else {
      console.error('An unexpected error occurred during course plan')
    }
    return null
  }
}
