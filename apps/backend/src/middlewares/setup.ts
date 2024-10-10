import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import { corsMiddleware } from '../config/cors'

export const setupExpressMiddleware = (app: any) => {
  app.use(corsMiddleware)
  app.use(bodyParser.json())
  app.use(fileUpload())
}
