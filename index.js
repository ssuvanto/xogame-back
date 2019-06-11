//const express = require('express')
import express from 'express'

const app = express()

//const apiRouter = require('./api/api')
import { apiRouter } from './api/api'

app.listen(4444, () => {
    console.log('Listening on port 4444...')
})

app.use('/api', apiRouter)