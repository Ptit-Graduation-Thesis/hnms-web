import axios from 'axios'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { history } from '@/App'

export const api = axios.create({
  baseURL: process.env.API,
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

api.interceptors.response.use((res) => res, (err) => {
  if (err.response.status === 403) {
    history.push({
      pathname: '/unauthorized',
      state: { status: 403 },
    })
  }
})

const setHeaderAuthorization = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const getToken = () => getLocalStorage(process.env.USER_TOKEN || 'USER_TOKEN')

export const setToken = (token: string) => {
  setLocalStorage(process.env.USER_TOKEN || 'USER_TOKEN', token)
  setHeaderAuthorization(token)
}

export const clearToken = () => setToken('')

setHeaderAuthorization(getToken())
