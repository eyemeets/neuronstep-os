import type { CurriculumOutlineSchema } from '@/types/curricula'
import { createServerInstance } from '../services/api' // Use the createServerInstance function
import { endpoints } from '../services/endpoints'

export const createCourse = async (coursePlan: any): Promise<CurriculumOutlineSchema | null> => {
  try {
    const server = await createServerInstance() // Ensure server instance is created
    const response = await server.post<CurriculumOutlineSchema>(endpoints.createCourse, coursePlan)

    return response.data
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error creating course:', err.message)
    }
    else {
      console.error('An unexpected error occurred during course creation')
    }
    return null // Return null if there's an error
  }
}
