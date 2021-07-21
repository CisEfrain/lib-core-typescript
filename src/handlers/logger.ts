import winston from 'winston'
import httpContext from 'express-http-context'
import apmSingleton from '@handlers/apm'

const log: any = {}

const enumerateErrorFormat = winston.format((info: any) => {
  const transformed: any = {}
  info.meta = info.meta ? info.meta : {}
  transformed.message = info.message
  transformed.level = info.level
  transformed['X-SAN-CorrelationId'] = info.procId ? info.procId : httpContext.get('correlationId')
  if (info.meta) transformed.fields = info.meta
  if (info.error) transformed.error = info.error.stack !== null && info.error.stack !== undefined ? info.error.stack : info.error
  return transformed
})

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        enumerateErrorFormat(),
        winston.format.json()
      )
    })
  ]
})

log.error = (messsage: any, error: any, meta: any): any => {
  logger.error(messsage, { error, meta })
  try {
    if (process.env.NODE_ENV === 'production')
      apmSingleton.getInstance().elasticApm.captureError(error || messsage)
  } catch (e) {
    logger.error('Error al utilizar APM', null)
  }
}
log.info = (message: string, meta: any): any => logger.info(message, meta)
log.verbose = (message: string, meta: any): any => logger.verbose(message, meta)
log.debug = (message: string, meta: any): any => logger.debug(message, meta)
log.warn = (message: string, meta: any): any => logger.warn(message, meta)

export default log
