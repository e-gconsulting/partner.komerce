import moment from 'moment'
import { getField, updateField } from 'vuex-map-fields'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  axiosKomship,
  formatYmd,
  last7,
  today,
  ranges,
  paymentMethods,
  getDates,
} from '@/store/helpers'

export default {
  components: {
    ToastificationContent,
  },
  namespaced: true,
  state: {
    saldo: 0,
    saldoPending: 0,
    saldoPendingOnProblem: 0,
    cashback: 0,
    orderanPerluDikirim: 0,
    orderanRetur: 0,
    topAdminOrders: [],
    customerLoyals: [],
    produkTerlarises: [],
    selectedProdukTerlaris: formatYmd(today),
    partnerIncomeGraph: [],
    selectedChart: 'COD',
    optionsChart: ['COD', 'Transfer Bank'],
    startDateChart: formatYmd(last7),
    endDateChart: formatYmd(today),
    loadingCurrentSaldo: true,
    loadingOrderSummary: true,
    loadingProductTerlaris: true,
    loadingTopAdminOrder: true,
    loadingCustomerLoyal: true,
    profile: [],
    // startDateChart: '2021-10-02',
    // endDateChart: '2021-11-31',
  },
  getters: {
    getField,
    selectedProdukTerlaris(state) {
      const date = new Date(state.selectedProdukTerlaris)
      const selectedDate = [
        new Date(date.getFullYear(), date.getMonth(), 1),
        new Date(date.getFullYear(), date.getMonth() + 1, 0),
      ]
      return selectedDate
    },
    partnerIncomeGraph(state) {
      return {
        labels: state.partnerIncomeGraph.map(item => moment(new Date(item.date)).format('DD MMM')),
        datasets: [
          {
            label: 'Penghasilan Bersih',
            backgroundColor: '#08A0F7',
            data: state.partnerIncomeGraph.map(item => item.net_income),
            lineTension: 0,
            pointRadius: 0,
          },
          {
            label: 'Penghasilan Kotor',
            backgroundColor: '#FBA63C',
            data: state.partnerIncomeGraph.map(item => item.gross_income),
            lineTension: 0,
            pointRadius: 0,
          },
        ],
      }
    },
    selectedChart(state) {
      return paymentMethods[state.selectedChart]
    },
  },
  mutations: {
    updateField,
    UPDATE_ِِBALANCE_SUMMARY(state, balanceSummary) {
      state.saldo = balanceSummary.balance
      state.saldoPending = balanceSummary.pending_balance
      state.saldoPendingOnProblem = balanceSummary.pending_balance_on_problem
      state.cashback = balanceSummary.total_earn_cashback
    },
    UPDATE_ORDER_SUMMARY(state, orderSummary) {
      state.orderanPerluDikirim = orderSummary.total_need_to_be_sent
      state.orderanRetur = orderSummary.total_return
    },
    UPDATE_TOP_ADMIN_ORDERS(state, topAdminOrders) {
      state.topAdminOrders = [
        ...topAdminOrders.map(order => ({
          name: order.admin_name,
          totalDana: order.net_profit,
          totalProduk: order.total_order,
          photo: order.photo_profile_url,
        })),
      ]
    },
    UPDATE_CUSTOMER_LOYALS(state, customerLoyals) {
      state.customerLoyals = [
        ...customerLoyals.map(customer => ({
          name: customer.customer_name,
          totalProduk: customer.total_order,
          totalDana: customer.total_spent,
          location: customer.address,
        })),
      ]
    },
    UPDATE_PRODUK_TERLARISES(state, produkTerlarises) {
      state.produkTerlarises = produkTerlarises.map(items => ({
        name: items.detail_product.product_name,
        photo: items.detail_product.images_path,
        variants: items.detail_product.variant_list.map(variant => ({
          variant_name: variant.variant_name,
        })),
        options: items.detail_product.options,
        total_sold: items.total_sold,
        percentage: items.total_sold_change_percentage,
      }))
    },
    UPDATE_PARTNER_INCOME_GRAPH(state, partnerIncomeGraph) {
      state.partnerIncomeGraph = getDates(new Date(state.startDateChart), new Date(state.endDateChart)).map(date => {
        const income = partnerIncomeGraph.find(item => item.date === date)
        if (income) {
          return income
        }
        return {
          total_transaction: 0,
          gross_income: 0,
          net_income: 0,
          date,
        }
      })
    },
    UPDATE_STATE_CURRENT_SALDO_LOADING(state, data) {
      state.loadingCurrentSaldo = data
    },
    UPDATE_STATE_ORDER_SUMMARY_LOADING(state, data) {
      state.loadingOrderSummary = data
    },
    UPDATE_STATE_PRODUCT_TERLARIS_LOADING(state, data) {
      state.loadingProductTerlaris = data
    },
    UPDATE_STATE_TOP_ADMIN_ORDER_LOADING(state, data) {
      state.loadingTopAdminOrder = data
    },
    UPDATE_STATE_CUSTOMER_LOYAL_LOADING(state, data) {
      state.loadingCustomerLoyal = data
    },
    UPDATE_ِِMY_PROFILE(state, myProfile) {
      state.profile = myProfile
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch('getBalanceSummary')
      dispatch('getOrderSummary')
      // dispatch('getTopAdminOrders')
      dispatch('getCustomerLoyal')
      dispatch('getProdukTerlarises')
      dispatch('getPartnerIncomeGraph')
      dispatch('getProfile')
    },
    async getBalanceSummary({ commit, rootState }) {
      commit('UPDATE_STATE_CURRENT_SALDO_LOADING', true)
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/dashboard/partner/balanceSummary',
        )
        commit('UPDATE_ِِBALANCE_SUMMARY', response.data.data)
        commit('UPDATE_STATE_CURRENT_SALDO_LOADING', false)
      } catch (e) {
        commit('UPDATE_STATE_CURRENT_SALDO_LOADING', false)
        console.error(e)
      }
    },
    async getOrderSummary({ commit, rootState }) {
      commit('UPDATE_STATE_ORDER_SUMMARY_LOADING', true)
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/dashboard/partner/orderSummary',
        )
        commit('UPDATE_ORDER_SUMMARY', response.data.data)
        commit('UPDATE_STATE_ORDER_SUMMARY_LOADING', false)
      } catch (e) {
        console.error(e)
        commit('UPDATE_STATE_ORDER_SUMMARY_LOADING', false)
      }
    },
    async getTopAdminOrders({ commit, rootState }) {
      commit('UPDATE_STATE_TOP_ADMIN_ORDER_LOADING', true)
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/dashboard/partner/topAdminOrder',
          {
            params: {
              limit: 0,
            },
          },
        )
        commit('UPDATE_TOP_ADMIN_ORDERS', response.data.data)
        commit('UPDATE_STATE_TOP_ADMIN_ORDER_LOADING', false)
      } catch (e) {
        console.error(e)
        commit('UPDATE_STATE_TOP_ADMIN_ORDER_LOADING', false)
      }
    },
    async getCustomerLoyal({ commit, rootState }) {
      commit('UPDATE_STATE_CUSTOMER_LOYAL_LOADING', true)
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/dashboard/partner/customerLoyal',
          {
            params: {
              limit: 3,
            },
          },
        )
        commit('UPDATE_CUSTOMER_LOYALS', response.data.data)
        commit('UPDATE_STATE_CUSTOMER_LOYAL_LOADING', false)
      } catch (e) {
        console.error(e)
        commit('UPDATE_STATE_CUSTOMER_LOYAL_LOADING', false)
      }
    },
    async getProdukTerlarises({ commit, rootState, getters }) {
      commit('UPDATE_STATE_PRODUCT_TERLARIS_LOADING', true)
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v2/dashboard/partner/bestSellerProducts',
          {
            params: {
              start_date: formatYmd(getters.selectedProdukTerlaris[0]),
              end_date: formatYmd(getters.selectedProdukTerlaris[1]),
              limit: 3,
            },
          },
        )
        commit('UPDATE_PRODUK_TERLARISES', response.data.data)
        commit('UPDATE_STATE_PRODUCT_TERLARIS_LOADING', false)
      } catch (e) {
        console.error(e)
        commit('UPDATE_STATE_PRODUCT_TERLARIS_LOADING', false)
      }
    },
    async getPartnerIncomeGraph({
      commit, getters, state, rootState,
    }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/finance/partner/partnerIncomeGraph',
          {
            params: {
              start_date: state.startDateChart,
              end_date: state.endDateChart,
              is_komship: 1,
              payment_method: getters.selectedChart,
            },
          },
        )
        commit('UPDATE_PARTNER_INCOME_GRAPH', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getProfile({ commit, rootState }) {
      try {
        const response = await axiosKomship().post(
          'v1/my-profile',
        )
        commit('UPDATE_ِِMY_PROFILE', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
