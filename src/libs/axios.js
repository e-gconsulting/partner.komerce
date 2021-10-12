import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URLDEVINTERNAL,
  timeout: 14000,
  headers: {
    'Application-Name': 'Web Komerce',
    'Access-Control-Allow-Headers': 'locahost:8080',
  },
})
const apiKomshipdev = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URLKOMSHIPDEV,
  timeout: 14000,
  headers: {
    'Application-Name': 'Web Komerce',
    'Access-Control-Allow-Headers': 'locahost:8080',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
})

apiKomshipdev.interceptors.response.use(
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
axiosIns.interceptors.response.use(
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

Vue.prototype.$http = axiosIns
Vue.prototype.$apiKomshipdev = apiKomshipdev

export { apiKomshipdev }
export default axiosIns
