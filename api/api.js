import { Router } from 'express'

import { hello } from './hello'

export const apiRouter = Router()

apiRouter.get('/', hello)