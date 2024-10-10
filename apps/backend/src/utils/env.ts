import fs from 'fs'
import path from 'path'

export const updateEnvFile = (value: string) => {
  const envPath = path.join(__dirname, '../../../mobile/.env')
  const envContent = fs.readFileSync(envPath, 'utf8')

  // Find the EXPO_PUBLIC_API_URL and replace it with the new one
  const updatedEnvContent = envContent.replace(
    /EXPO_PUBLIC_API_URL=.*/g, // Regex to match the EXPO_PUBLIC_API_URL variable
    `EXPO_PUBLIC_API_URL=${value}` // Replace it with the new value
  )

  // Write the updated content back to the .env file
  fs.writeFileSync(envPath, updatedEnvContent, 'utf8')
}
