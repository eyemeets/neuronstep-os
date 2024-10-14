import fs from 'fs'
import path from 'path'

export const updateEnvFile = (value: string) => {
  const envPath = path.join(__dirname, '../../../mobile/.env')
  const envContent = fs.readFileSync(envPath, 'utf8')

  const updatedEnvContent = envContent.replace(
    /EXPO_PUBLIC_API_URL=.*/g,
    `EXPO_PUBLIC_API_URL=${value}`
  )

  // Write the updated content back to the .env file
  fs.writeFileSync(envPath, updatedEnvContent, 'utf8')
}
