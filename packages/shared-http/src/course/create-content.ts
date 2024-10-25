import type { CourseGenStructure, CourseOutlineSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../http-client'
import { endpoints } from '@repo/shared-constants'
import { Auth } from 'firebase/auth';

export const createCourseContent = async (params: { auth: Auth; coursePlan: CourseGenStructure }): Promise<CourseOutlineSchema | null> => {
  try {
    const course = await createCourseServerInstance(params.auth)
    const response = await course.post<CourseOutlineSchema>(endpoints.course.content, params.coursePlan)

    return response.data
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error creating course:', err.message)
    }
    else {
      console.error('An unexpected error occurred during course creation')
    }
    return null
  }
}
