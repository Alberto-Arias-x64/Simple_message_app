const express = require('express')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,{cors:'http://localhost:3000'})

let mensaje

io.on('connection',socket =>{
    socket.on('new',data =>{
        mensaje = data
        io.emit('mensaje',mensaje)
    })
})

server.listen(3001,() =>{
    console.log('Server online')
})