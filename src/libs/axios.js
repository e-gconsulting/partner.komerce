import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 14000,
  // headers: { 'X-Custom-Header': 'foobar' },
})

axiosIns.interceptors.response.use(
  response => response,
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 || error.response.status === 403) {
      window.location('/unauthorized')
    }
    return Promise.reject(error)
  },
)

Vue.prototype.$http = axiosIns

export default axiosIns
