import express, { json } from 'express' // require -> commonJS
import { corsMiddleware } from './middleware/cors.js'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

  // métodos normales: GET/HEAD/POST
  // métodos complejos: PUT/PATCH/DELETE

  // CORS PRE-Flight
  // OPTIONS

  // Todos los recursos que sean MOVIES se identifica con /movies
  app.use('/movies', createMovieRouter({ movieModel }))
  
  const PORT = process.env.PORT ?? 1234
  
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}