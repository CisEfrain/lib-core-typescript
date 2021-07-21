/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { v4 as uuidv4 } from 'uuid'
import httpContext from 'express-http-context'
import { Request, Response } from 'express'

const correlationId = (req: Request, res: Response, next: any): any => {
  const LIVE_PATH = '/live'

  if (req.originalUrl !== LIVE_PATH && req.originalUrl) {
    let processId
    if (req.headers['X-SAN-CorrelationId']) {
      processId = req.headers['X-SAN-CorrelationId']
    } else {
      processId = uuidv4()
      req.headers['X-SAN-CorrelationId'] = processId
    }
    httpContext.set('correlationId', processId)
  }
  next()
}

export default correlationId
