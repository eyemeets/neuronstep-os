import type { CourseObjectiveSchema } from 'shared-types'
import { createCourseServerInstance } from './api' // Import the function to create the instance
import { endpoints } from 'shared-constants'
import courseObjectiveResponseData from '@/mockup/curriculum/objective-response'

export const validateObjective = async (params: { data: string; mockupResponse?: boolean }): Promise<CourseObjectiveSchema | null> => {
  try {
    // If mockupResponse is true, return the mock data
    if (params.mockupResponse) {
      return courseObjectiveResponseData as CourseObjectiveSchema // Return mock data directly
    }

    const course = await createCourseServerInstance()
    const response = await course.post<CourseObjectiveSchema>(endpoints.course.objective, params.data)

    return response.data // Return the data of type ValidatedObjective
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('API error:', err.message)
    }
    else {
      console.error('An unexpected error occurred')
    }
    return null // Return null if there was an error
  }
}
