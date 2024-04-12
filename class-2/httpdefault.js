const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    const url = req.url
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (url == '/') {
        res.end('<h1>Bienvenido a mi página de inicio</h1>')

    } else if (url == '/miles-morales-image.jpg') {
        fs.readFile('./images/miles.jpg', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>Error Interno Del Servidor</h1>')
            } else {
                res.setHeader('Content-Type', 'image/jpg')
                res.end(data)
            }
        })
    } else {
        res.statusCode = 404
        res.end('<h1>Error 404</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${desiredPort}`)
})