import type { CourseObjectiveSchema, CourseOutlineSchema, CoursePlanSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../http-client' // Use the createServerInstance function
import { endpoints } from '@repo/shared-constants'
import { Auth } from 'firebase/auth';

export const createCourseOutline = async (params: { auth: Auth; objective: CourseObjectiveSchema; plan: CoursePlanSchema}): Promise<CourseOutlineSchema | null> => {
  try {
    const course = await createCourseServerInstance(params.auth)
    const response = await course.post<CourseOutlineSchema>(endpoints.course.outline, {
       objective: params.objective, 
       plan: params.plan
    })

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
