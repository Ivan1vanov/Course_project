import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as env from 'dotenv'
import config from 'config'
import fileUpload from 'express-fileupload'
import { routes } from './routes/routes';
import path from 'path'
import bodyParser from 'body-parser';

import {createServer} from 'http'
import { Socket, Server } from 'socket.io'

const app = express()

env.config({path: __dirname+'/.env'}) 

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
})

app.get('/', (_, res) => {
    res.send('hello woth sockets')
})

app.use(cors({origin: '*'}))
app.use(bodyParser.json({limit: '70mb'}));
app.use(bodyParser.urlencoded({limit: '70mb', extended: true}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({}))


const EVENTS = {
    connection:'connection',
    disconnection: 'disconnect',
    join_item: 'join_item',
    comment_item: 'comment_item',
    receive_comment: 'receive_comment'
}

io.on(EVENTS.connection, (socket: Socket) => { 
    console.log(`User connected ${socket.id}`)

    socket.on(EVENTS.join_item, (data) => {
        socket.join(data)
        console.log(`User with ID ${socket.id} joined item ${data}`)
    })

    socket.on(EVENTS.comment_item, (data) => {
        console.log(data)
        socket.to(data.itemId).emit(EVENTS.receive_comment, data)
    })

    socket.on(EVENTS.disconnection, () => {
        console.log(`userdisconnected  ${socket.id}`)
    })
})

 

const PORT: string | number = process.env.PORT || 5000

mongoose.connect(config.get<string>('dbUrl'))
    .then(() => httpServer.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`)
        routes(app)
    })).catch(e => console.log(e))

