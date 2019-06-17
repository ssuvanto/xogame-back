import { Router } from 'express'

import { hello } from './hello'
import { getGameState } from './getgame'
import { login, check } from './login'

export const apiRouter = Router()

apiRouter.put('/', hello) //testing

apiRouter.post('/login', login)

apiRouter.get('/games/:id', check, getGameState)