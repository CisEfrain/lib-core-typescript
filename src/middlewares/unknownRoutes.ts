import { Request, Response } from 'express'

const unknownRoutes = (req: Request, res: Response): void => {
  res.status(404).json({ code: 'NOT_FOUND', statusCode: 404, message: 'Service not found' })
}

export default unknownRoutes
