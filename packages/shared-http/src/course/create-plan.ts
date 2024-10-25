import type { CourseObjectiveSchema, CoursePlanSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../http-client' // Use the createServerInstance function
import { endpoints } from '@repo/shared-constants'
import { Auth } from 'firebase/auth';

export const createCoursePlan = async (params: { auth: Auth; objective: CourseObjectiveSchema }) : Promise<CoursePlanSchema | null> => {
  try {
    const course = await createCourseServerInstance(params.auth)
    const response = await course.post<CoursePlanSchema>(endpoints.course.plan, params.objective)

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
