import axios from 'axios'
import { BASE_URL, TIMEOUT, JWT_KEY } from '@/constants/config'

const createInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  instance.interceptors.request.use(handleRequest)
  instance.interceptors.response.use(handleResponse, handleError)

  return instance
}

const handleRequest = config => {
  const jwt = localStorage.getItem(JWT_KEY)
  if (jwt) {
    const token = JSON.parse(jwt).user.token
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

const handleResponse = response => {
  if (response && response.data) {
    return response.data
  }
  return response
}

const handleError = error => {
  const { message, response } = error
  return Promise.reject(response ? response.data.message || message : error)
}

export default createInstance()
