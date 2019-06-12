import { Router } from 'express'

import { hello } from './hello'
import { getGameState } from './getgame'

export const apiRouter = Router()

apiRouter.put('/', hello)

apiRouter.get('/games/:id', getGameState)