import express from 'express'
import { MongoClient } from 'mongodb'
import * as sockjs from 'sockjs'
import * as http from 'http'

import { apiRouter } from './api/api'
import { addMarkMsg } from './gamelogic'

const mongo = new MongoClient('mongodb://172.17.0.2:27017')
export let db = null
mongo.connect(err => {
    if(err){
        console.log(err)
        process.exit(1)
    }
    console.log('Connected to mongoDB!')
    db = mongo.db('mytestdb')
})

const app = express()
//Start server
/*app.listen(4444, () => {
    console.log('Listening on port 4444...')
})*/

//Websocket server
const sock = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'})
sock.on('connection', c => {
    c.on('data', m => {
        console.log(m)
        m = JSON.parse(m)
        switch(m.type){
            case 'echo':
                console.log('echo')
                c.write(JSON.stringify({type: 'echo', data: 'Echo: '+m.data}))
                break
            case 'mark':
                console.log('mark')
                addMarkMsg(m.data, (res) => {c.write(JSON.stringify(res))})
                break
            default:
                console.log('Message with unknown type')
        }
    })
})

//Http server
const server = http.createServer(app)
sock.installHandlers(server, {prefix: '/sock'})
server.listen(4444, () => {
    console.log('Listening on port 4444...')
})


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

//JSON Only
app.use(express.json())

//Routes
app.use('/api', apiRouter)