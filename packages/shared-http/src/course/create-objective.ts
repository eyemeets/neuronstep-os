import type { CourseObjectiveSchema } from '@repo/shared-types'
import { createCourseServerInstance } from '../http-client' // Import the function to create the instance
import { endpoints } from '@repo/shared-constants'
import { Auth } from 'firebase/auth';

import { registerBackgroundTask, sleep } from '@repo/shared-utils'
import { courseObjectiveResponseData } from '@repo/shared-mockups'

export const createCourseObjective = async (params: { auth: Auth, data: string; mockupResponse?: boolean }): Promise<CourseObjectiveSchema | null> => {
  try {
    if (params.mockupResponse) {
      await sleep(500)
      return courseObjectiveResponseData as CourseObjectiveSchema
    }

    const course = await createCourseServerInstance(params.auth)
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
export const registerCourseObjectiveTask = async (params: { auth: Auth; data: string; mockupResponse?: boolean }) => {
  await registerBackgroundTask(COURSE_OBJECTIVE_TASK, () => createCourseObjective(params), 15 * 60)
}
