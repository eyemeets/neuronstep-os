import cors from 'cors'

// CORS options setup
export const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: [ 'GET', 'POST', 'PUT', 'DELETE' ], // Specify allowed methods
  allowedHeaders: [ 'Content-Type', 'Authorization' ] // Specify allowed headers
}

export const corsMiddleware = cors(corsOptions)
