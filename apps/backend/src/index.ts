import './config/dotenv' // Load environment variables
import express from 'express'
import path from 'path'
import { createRouter } from 'express-file-routing'
import { setupExpressMiddleware } from './middlewares/setup'
import { getLocalNetworkIp } from './utils/utils'
import { prod } from './environments/prod'
import { dev } from './environments/dev'
import { requestLogger } from './middlewares/request-logger'
import { authenticateUser } from './middlewares/auth'

const app = express()
const localIp = getLocalNetworkIp() // Get the Wi-Fi IP address dynamically
const port = 8080
const isProd = process.env.NODE_ENV === 'production'

// Setup middlewares
setupExpressMiddleware(app)
app.use(requestLogger)
app.use(authenticateUser)

// Start the server
app.listen(port, localIp, async () => {
  await createRouter(app, {
    directory: path.join(__dirname, 'routes')
  })

  isProd ? prod(localIp, port) : dev(localIp, port)
})

export default app
