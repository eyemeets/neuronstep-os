import { requestLogger } from '../middlewares/request-logger'
import { updateEnvFile } from '../utils/env'

export const dev = (localIp: string, port: number) => {
  const apiUrl = `http://${localIp}:${port}`

  // Only update the .env file in development environment
  updateEnvFile(apiUrl)
  
  console.log(`Express server running on ${apiUrl}`)
}
