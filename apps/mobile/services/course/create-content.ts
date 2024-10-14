import type { CourseGenStructure, CourseOutlineSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../api'
import { endpoints } from '@repo/shared-constants'

export const createCourseContent = async (coursePlan: CourseGenStructure): Promise<CourseOutlineSchema | null> => {
  try {
    const course = await createCourseServerInstance()
    const response = await course.post<CourseOutlineSchema>(endpoints.course.content, coursePlan)

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
