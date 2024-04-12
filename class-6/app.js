import express from 'express'
import logger from 'morgan'
import mysql from 'mysql2/promise.js'

import { createServer } from 'node:http'
import { Server } from 'socket.io'

const PORT = process.env.PORT ?? 3000

const configDB = {
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'chat'
}

const connection = await mysql.createConnection(configDB)

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

io.on('connection', async (socket) => {
    console.log('A user has conected')

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })

    socket.on('chat message', async (message) => {
        let result
        const username = socket.handshake.auth.username ?? 'anonymus'
        console.log(socket.handshake.auth)
        try {
            result = await connection.query('INSERT INTO message(content, user) VALUES(?, ?);', [message, username])
        } catch (e) {
            console.log(e)
        }

        io.emit('chat message', message, result.insertId, username)
    })
    
    if (!socket.recovered) {
        try {
            const [results] = await connection.query('SELECT id, content, user FROM message WHERE id > ?;', [socket.handshake.auth.serverOffSet ?? 0])
            results.forEach((message) => {
                io.emit('chat message', message.content, message.id, message.user)
            })
        } catch (e) {
            console.log(e)
        }
    }
})

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(`${process.cwd()}/client/index.html`)
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})