import express from 'express'
import { MongoClient } from 'mongodb'

import { apiRouter } from './api/api'

const mongo = new MongoClient('mongodb://172.17.0.2:27017')
mongo.connect(err => {
    if(err){
        console.log(err)
        process.exit(1)
    }
    console.log('Connected to mongoDB!')
    const db = mongo.db('mytestdb')
    const coll = db.collection('testings')
})

const app = express()
//Start server
app.listen(4444, () => {
    console.log('Listening on port 4444...')
})

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

//Routes
app.use('/api', apiRouter)