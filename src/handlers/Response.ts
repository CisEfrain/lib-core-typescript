/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IResponse } from '../interfaces'
import { logger } from '@handlers'

const codeErrors = [
  { code: 'UNCAUGHT_EXCEPTION', statusCode: 500, message: 'Server error', result: {} },
  { code: 'INVALID_BODY', statusCode: 400, message: 'Invalid request', result: {} },
  { code: 'INVALID_QUERY', statusCode: 400, message: 'Invalid query', result: {} },
  { code: 'SUCCESS', statusCode: 200, message: 'The request has been successful', result: {} },
  { code: 'DEFAULT_RESPONSE', statusCode: 200, message: 'The data is not valid for an integration response', result: {} },
  { code: 'NO_CONTENT', statusCode: 200, message: 'There is no content related to your request', result: {} }
]

export class Response {
  private set(code: string, data?: any): IResponse {
    const newResponse = codeErrors.filter(e => e.code === code)[0]
    newResponse.result = data || {}
    return newResponse
  }

  success(data?: any, code = 'SUCCESS'): IResponse {
    logger.info('success response', data)
    return this.set(code, data)
  }

  noContent(data?: any): IResponse {
    logger.info('no content response', data)
    return this.set('NO_CONTENT', data)
  }

  invalid(message?: string): IResponse {
    const response = this.set('INVALID_BODY')
    if (message) response.message = message
    logger.warn(message)
    return response
  }

  error(code: string, error: Error): IResponse {
    const response = this.set(code)
    logger.error(response.message, error)
    return response
  }
}
