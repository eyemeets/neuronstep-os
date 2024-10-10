import { createServerInstance } from '../services/api' // Import the function to create the instance
import { endpoints } from '../services/endpoints'
import curriculumObjectiveResponseData from '@/mockup/curriculum/objective-response'
import type { ValidatedObjective } from '@/types/curricula' // Import the correct type

export const validatePrompt = async (params: { data: string; mockupResponse?: boolean }): Promise<ValidatedObjective | null> => {
  try {
    // If mockupResponse is true, return the mock data
    if (params.mockupResponse) {
      return curriculumObjectiveResponseData as ValidatedObjective // Return mock data directly
    }

    // Otherwise, make the real API call
    const server = await createServerInstance() // Ensure server instance is created before usage
    const response = await server.post<ValidatedObjective>(endpoints.validateObjective, params.data)

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
