import Vue from 'vue'
import Vuex from 'vuex'

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

Vue.use(Vuex)

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
  },
  strict: process.env.DEV,
})
