// axios
import axios2 from 'axios'
import useJwt from '@/auth/jwt/useJwt'

const token = useJwt.getToken()

axios2.defaults.baseURL = process.env.VUE_APP_BASE_URLKOMSHIPDEV
axios2.defaults.headers.common = { Authorization: `Bearer ${token}` }

export default axios2

// const apiKomshipdev = axios2.create({
//   // You can add your headers here
//   // ================================
//   baseURL: process.env.VUE_APP_BASE_URLKOMSHIPDEV,
//   timeout: 14000,
//   headers: {
//     'Application-Name': 'Web Komerce',
//     'Cache-Control': 'no-cache',
//     Pragma: 'no-cache',
//   },
// })

// apiKomshipdev.interceptors.response.use(
//   response => response,
//   error => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     if (error?.response?.status === 403) {
//       window.location = '/unauthenticated'
//     }
//     /* eslint-disable comma-dangle */
//     return Promise.reject(error)
//   }
// )

// Vue.prototype.$apiKomshipdev = apiKomshipdev

// export default apiKomshipdev
