const http = require('node:http')

const dittoPokemon = require('./pokemons/ditto.json')
const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json')
                    return res.end(JSON.stringify(dittoPokemon))
                case '/about':

                default:
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    res.statusCode = 404
                    res.end('<h1>Error 404</h1>')
            }

        case 'POST':
            switch (url) {
                case '/pokemon':
                    let body = ''

                    req.on('data', (chunk) => {
                        body += chunk.toString()
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)

                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
                        res.end(JSON.stringify(data))
                    })
            }
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${desiredPort}`)
})