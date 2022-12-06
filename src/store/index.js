import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
// Modules
import app from './app'
import dashboard from './app/dashboard'
import penghasilan from './app/penghasilan'
import saldo from './app/saldo'
import saldoPenarikan from './app/saldo_penarikan'
import saldoDetail from './app/saldo_detail'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import menuaccess from './menuaccess'
import pencairan from './pencairan'
import kompackAdmin from './kompack/admin'
import riwayatPengajuan from './app/riwayat_pengajuan'

Vue.use(Vuex)
const ls = new SecureLS({ isCompression: false })

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    dashboard,
    penghasilan,
    saldo,
    saldoPenarikan,
    saldoDetail,
    menuaccess,
    pencairan,
    kompackAdmin,
    riwayatPengajuan,
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
