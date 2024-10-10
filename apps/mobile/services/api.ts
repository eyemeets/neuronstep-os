import { auth } from '@/fb.config'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

// Use Expo's environment variable to get the base URL
const baseURL = process.env.EXPO_PUBLIC_API_URL

export const createServerInstance = async (config: AxiosRequestConfig = {}) => {
  const server = axios.create({
    baseURL: `${baseURL}${config.baseURL}`,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers // Merge any custom headers from config
    },
    ...config // Spread any additional configurations from the parameter
  })

  server.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error('API error:', error.response.status, error.response.data)
      }
      else if (error.request) {
        console.error('API error: No response received', error.request)
      }
      else {
        console.error('API error:', error.message)
      }
      return Promise.reject(error)
    }
  )

  return server
}

export const createCourseServerInstance = async () => {
  const token = await auth.currentUser?.getIdToken()

  // Create server instance for course-related API calls
  const courseServer = await createServerInstance({
    baseURL: '/course/',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  })

  return courseServer
}
