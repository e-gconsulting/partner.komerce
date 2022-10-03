import secureLocalStorage from '@/libs/secureLocalstorage'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        // if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              if (r.data.status === false) {
                this.error = r.data.message
              } else {
                this.setToken(r.data.access_token)
                this.onAccessTokenFetched(r.data.access_token)
              }
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return secureLocalStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    secureLocalStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  resetPassword(...args) {
    return this.axiosIns.post(this.jwtConfig.resetPasswordEndpoint, ...args)
  }

  registerPartner(...args) {
    return this.axiosIns.post(this.jwtConfig.registerPartnerEndpoint, ...args)
  }

  registerKomship(...args) {
    return this.axiosIns.post(this.jwtConfig.registerKomshipEndpoint, ...args)
  }

  loginKomship(...args) {
    return this.axiosIns.post(this.jwtConfig.loginKomshipEndpoint, ...args)
  }

  registerTalent(...args) {
    return this.axiosIns.post(this.jwtConfig.registerTalentEndpoint, ...args)
  }

  logout(...args) {
    return this.axiosIns.post(this.jwtConfig.logoutEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      user_id: JSON.parse(localStorage.getItem('userData')).id,
    })
  }
}
