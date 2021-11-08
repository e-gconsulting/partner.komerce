import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import menuaccess from './menuaccess'
import pencairan from './pencairan'

Vue.use(Vuex)
const ls = new SecureLS({ isCompression: false })

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    menuaccess,
    pencairan,
  },
  plugins: [createPersistedState({
    key: 'vuex-store',
    storage: {
      getItem: key => {
        if (process.env.NODE_ENV === 'production') {
          return ls.get(key)
        }
        return localStorage.getItem(key)
      },
      setItem: (key, value) => {
        if (process.env.NODE_ENV === 'production') {
          return ls.set(key, value)
        }
        return localStorage.setItem(key, value)
      },
      removeItem: key => {
        if (process.env.NODE_ENV === 'production') {
          return ls.remove(key)
        }
        return localStorage.removeItem(key)
      },
    },
  })],
  strict: process.env.DEV,
})
