import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 14000,
  headers: {
    'Application-Name': 'Web Komerce',
  },
})

const axiosInsKomship = axios.create({
  // You can add your headers here
  headers: new Headers({
    'Application-Name': 'Web Komerce',
    'Access-Control-Allow-Headers': 'localhost:8080',
  }),
  baseURL: process.env.VUE_APP_BASE_URL_KOMSHIP,
  timeout: 14000,
})

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

axiosInsKomship.interceptors.response.use(
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
Vue.prototype.$httpKomship = axiosInsKomship

export default axiosIns
