import Vue from 'vue'

// axios
import axios from 'axios'

// BaseUrl Komship
const axiosIns = axios.create({
  // You can add your headers here
  // headers: new Headers({
  //   'Application-Name': 'Web Komerce',
  //   'Access-Control-Allow-Headers': 'localhost:8080',
  // }),
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 14000,
  headers: {
    'Application-Name': 'Web Komerce',
    'Access-Control-Allow-Headers': 'localhost:8080',
  },
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

const axiosIns2 = axios.create({
  // You can add your headers here
  headers: new Headers({
    'Application-Name': 'Web Komerce',
    'Access-Control-Allow-Origin': '*',
  }),
  // ================================
  baseURL: 'https://komshipdev.komerce.id/api',
  timeout: 14000,
  // headers: {
  //   'Application-Name': 'Web Komerce',
  // },
})

Vue.prototype.$http = axiosIns
Vue.prototype.$http2 = axiosIns2

export default axiosIns
