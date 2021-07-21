import express from 'express'
import { correlationIdMiddleware } from '@middlewares'
import helmet from 'helmet'

const app = express()

app.use(correlationIdMiddleware)
app.use(express.json())
app.use(helmet.hidePoweredBy())

export default app
