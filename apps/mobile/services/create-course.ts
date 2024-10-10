import type { CurriculumOutlineSchema, CurriculumPlan } from '@/types/curricula'
import { createCourseServerInstance } from './api' // Use the createServerInstance function
import { endpoints } from './endpoints'

export const createCourse = async (coursePlan: CurriculumPlan): Promise<CurriculumOutlineSchema | null> => {
  try {
    const course = await createCourseServerInstance()
    const response = await course.post<CurriculumOutlineSchema>(endpoints.course.create, coursePlan)

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
