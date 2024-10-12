import type { CoursePlanSchema, CourseOutlineSchema } from 'shared-types'
import { createCourseServerInstance } from './api' // Use the createServerInstance function
import { endpoints } from 'shared-constants'

export const createCourse = async (coursePlan: CoursePlanSchema): Promise<CourseOutlineSchema | null> => {
  try {
    const course = await createCourseServerInstance()
    const response = await course.post<CourseOutlineSchema>(endpoints.course.create, coursePlan)

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
