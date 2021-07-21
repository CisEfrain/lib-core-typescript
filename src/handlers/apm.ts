import logger from './logger'

class PrivateApmSingleton {
  public elasticApm: any;

  constructor() {
    this.elasticApm = require('elastic-apm-node')
    this.elasticApm.start({
      serverUrl: process.env.URL_APM,
      active: !!process.env.URL_APM,
      centralConfig: false
    })

    this.elasticApm.handleUncaughtExceptions(function (error: any) {
      logger.error('uncaughtException elasticApm', error)
      process.exit(1)
    })
  }
}

export default class ApmSingleton {
  public static instance: PrivateApmSingleton

  constructor() {
    throw new Error('Use ApmSingleton.getInstance()')
  }

  static getInstance(): any {
    if (!ApmSingleton.instance) {
      ApmSingleton.instance = new PrivateApmSingleton()
    }
    return ApmSingleton.instance
  }
}
