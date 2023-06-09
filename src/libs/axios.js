import Vue from 'vue'

// axios
import axios from 'axios'
import useJwt from '@core/auth/jwt/useJwt'

const { jwt } = useJwt(axios, {})
const token = jwt.getToken()

// instance for main komerce
const axiosIns = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 12000,
  headers: {
    'Application-Name': 'Web Komerce',
  },
})

const axiosAuthKompack = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 14000,
  headers: {
    'Application-Name': 'Web Komerce',
  },
})

const komshipAxiosIns = axios.create({
  // You can add your headers here
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: process.env.VUE_APP_BASE_URL_KOMSHIP,
  timeout: 12000,
})

const kompackkomshipAxiosIns = axios.create({
  // You can add your headers here
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: process.env.VUE_APP_BASE_URL_KOMPACKKOMSHIP_ADMIN,
  timeout: 14000,
})

const affiliateAxiosIns = axios.create({
  // You can add your headers here
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: process.env.VUE_APP_BASE_URL_AFFILIATE,
  timeout: 12000,
})

const printService = axios.create({
  // You can add your headers here
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: process.env.VUE_APP_PRINT_LABEL,
  timeout: 12000,
})

axiosIns.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error
    if (error?.response?.status === 403) {
      window.location = '/unauthenticated'
    }
    /* eslint-disable comma-dangle */
    return Promise.reject(error)
  }
)
axiosAuthKompack.interceptors.response.use(
  response => response,
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 403) {
      window.location = '/unauthenticated'
    }
    /* eslint-disable comma-dangle */
    return Promise.reject(error)
  }
)

komshipAxiosIns.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error
    if (error?.response?.status === 403) {
      window.location = '/unauthenticated'
    }
    /* eslint-disable comma-dangle */
    return Promise.reject(error)
  }
)
kompackkomshipAxiosIns.interceptors.response.use(
  response => response,
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 403) {
      window.location = '/unauthenticated'
    }
    /* eslint-disable comma-dangle */
    return Promise.reject(error)
  }
)

affiliateAxiosIns.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error
    if (error?.response?.status === 403) {
      window.location = '/unauthenticated'
    }
    /* eslint-disable comma-dangle */
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axiosIns
Vue.prototype.$http_kompack = axiosAuthKompack
Vue.prototype.$http_kompack_kompship = kompackkomshipAxiosIns
Vue.prototype.$http_komship = komshipAxiosIns
Vue.prototype.$http_komship_affiliate = affiliateAxiosIns
Vue.prototype.$http_print = printService

export { axiosAuthKompack }
export default axiosIns
