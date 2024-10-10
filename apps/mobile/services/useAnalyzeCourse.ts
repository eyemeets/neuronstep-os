import type { CurriculumPlan, ValidatedObjective } from '@/types/curricula'
import { createServerInstance } from '../services/api' // Use the createServerInstance function
import { endpoints } from '../services/endpoints'

export const analyzeCourse = async (validatedObjective: ValidatedObjective): Promise<CurriculumPlan | null> => {
  try {
    const server = await createServerInstance() // Ensure server instance is created
    const response = await server.post<CurriculumPlan>(endpoints.analyzeCourse, validatedObjective)

    return response.data
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error analyzing course:', err.message)
    }
    else {
      console.error('An unexpected error occurred during course analysis')
    }
    return null // Return null if there's an error
  }
}
