const ditto = require('./pokemons/ditto.json')
const express = require('express')
const app = express()

// Indica el puerto mediante variables de entorno o uno por defecto
const PORT = process.env.PORT ?? 1234

// Desactiva la propiedad expecificada
app.disable('x-powered-by')

// Creación de MiddleWare para transformar solicitudes POST JSON
// Tenemos varias opciones, obviamente usar una a la vez
// Opción - 1
app.use((req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            const data = JSON.parse(body)
            req.body = data
            
            next()
        })
    }else{
        next()
    }
})

// Opción - 2
app.use(express.json())

// Manejo de rutas por GET
app.get('/pokemon/ditto', (req, res) => {
    res.json(ditto)
})

// Manejo de rutas por POST
app.post('/pokemon', (req, res) => {
    console.log(req.body)
    res.status(201).json(req.body)
})

// Manejo de error 404 al no encontrar ruta
app.use((req, res) => {
    req.status(404).send('<h1>Error 404</h1>')
})

// Indicamos el puerto especificado arriba
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})