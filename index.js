import express from 'express'

const app = express()

import { apiRouter } from './api/api'

app.listen(4444, () => {
    console.log('Listening on port 4444...')
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use('/api', apiRouter)