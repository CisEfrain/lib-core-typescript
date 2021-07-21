import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import * as rax from 'retry-axios'
import https from 'https'

const axiosInstance: AxiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});



axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers['Content-Type'])
    config.headers['Content-Type'] = 'application/json'
  return config
})

rax.attach(axiosInstance)

const httpClient = {
  get: async (path: string, configuration: AxiosRequestConfig): Promise<any> => await axiosInstance.get(path, configuration),
  post: async (path: string, data: any, configuration: AxiosRequestConfig): Promise<any> => await axiosInstance.post(path, data, configuration),
  put: async (path: string, data: any, configuration: AxiosRequestConfig): Promise<any> => await axiosInstance.put(path, data, configuration),
  patch: async (path: string, data: any, configuration: AxiosRequestConfig): Promise<any> => await axiosInstance.patch(path, data, configuration),
  delete: async (path: string, configuration: AxiosRequestConfig): Promise<any> => await axiosInstance.delete(path, configuration)
}

export default httpClient
function httpsAgent(httpsAgent: any, arg1: any): AxiosInstance {
  throw new Error('Function not implemented.')
}

