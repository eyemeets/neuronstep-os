export const prod = (localIp: string, port: number) => {
  const apiUrl = `http://${localIp}:${port}`

  console.log(`Production server running on ${apiUrl}`)
  
  // Add other production-specific setups, such as security, logging, etc.
}
