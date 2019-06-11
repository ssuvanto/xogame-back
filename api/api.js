import { Router } from 'express'

import { hello } from './hello'
import { getGameState } from './game'

export const apiRouter = Router()

apiRouter.get('/', hello)

apiRouter.get('/games/:id', getGameState)