import type { CourseObjectiveSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../api' // Import the function to create the instance
import { endpoints } from '@repo/shared-constants'

import { registerBackgroundTask, sleep } from '../../utils/index'
import courseObjectiveResponseData from '../../mockup/curriculum/objective-response'

export const createCourseObjective = async (params: { data: string; mockupResponse?: boolean }): Promise<CourseObjectiveSchema | null> => {
  try {
    if (params.mockupResponse) {
      await sleep(500)
      return courseObjectiveResponseData as CourseObjectiveSchema
    }

    const course = await createCourseServerInstance()
    const response = await course.post<CourseObjectiveSchema>(endpoints.course.objective, params.data)

    return response.data
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('API error:', err.message)
    }
    else {
      console.error('An unexpected error occurred')
    }
    return null
  }
}

const COURSE_OBJECTIVE_TASK = 'COURSE_OBJECTIVE_TASK'

// Function to register the course objective creation task
export const registerCourseObjectiveTask = async (params: { data: string; mockupResponse?: boolean }) => {
  await registerBackgroundTask(COURSE_OBJECTIVE_TASK, () => createCourseObjective(params), 15 * 60)
}
