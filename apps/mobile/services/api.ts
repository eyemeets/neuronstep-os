import axios from 'axios'

// Use Expo's environment variable to get the base URL
const baseURL = process.env.EXPO_PUBLIC_API_URL

export const createServerInstance = async () => {
  const server = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
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
