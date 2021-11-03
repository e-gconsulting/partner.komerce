import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

const axiosKomship = partnerId => {
  const axios = Vue.prototype.$http_komship
  axios.defaults.params = { partner_id: partnerId }
  return axios
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const last7 = new Date()
last7.setDate(today.getDate() - 7)
last7.setHours(0, 0, 0, 0)

const last30 = new Date()
last30.setDate(today.getDate() - 30)
last30.setHours(0, 0, 0, 0)

const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
const lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

export default {
  namespaced: true,
  state: {
    saldo: 0,
    saldoPending: 0,
    cashback: 0,
    orderanPerluDikirim: 0,
    orderanRetur: 0,
    topAdminOrders: [],
    customerLoyals: [],
    produkTerlarises: [],
    selectedProdukTerlaris: 'Bulan Ini',
    optionsProdukTerlaris: ['Bulan Ini', '7 Hari Terakhir'],
    ranges: {
      'Real Time': [today, today],
      '7 Hari Terakhir': [last7, today],
      '30 Hari Terakhir': [last30, today],
      'Bulan Ini': [firstDateOfMonth, lastDateOfMonth],
      'Custom Tanggal': [null, null],
    },
  },
  getters: {
    getField,
    selectedProdukTerlaris(state) {
      return state.ranges[state.selectedProdukTerlaris]
    },
  },
  mutations: {
    updateField,
    UPDATE_ِِBALANCE_SUMMARY(state, balanceSummary) {
      state.saldo = balanceSummary.balance
      state.saldoPending = balanceSummary.pending_balance
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
        })),
      ]
    },
    UPDATE_CUSTOMER_LOYALS(state, customerLoyals) {
      state.customerLoyals = [
        ...customerLoyals.map(customer => ({
          name: customer.customer_name,
          totalProduk: customer.total_order,
          totalDana: customer.total_spent,
        })),
      ]
    },
    UPDATE_PRODUK_TERLARISES(state, produkTerlarises) {
      state.produkTerlarises = [
        ...produkTerlarises.map(produk => ({
          photo: produk.images_path,
          name: produk.product_id,
          kodeBrg: produk.product_sku,
          penjualan: produk.total_sold,
          persentase: produk.total_sold_change_percentage,
        })),
      ]
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch('getBalanceSummary')
      dispatch('getOrderSummary')
      dispatch('getTopAdminOrders')
      dispatch('getCustomerLoyal')
      dispatch('getProdukTerlarises')
    },
    async getBalanceSummary({ commit, rootState }) {
      try {
        const response = await axiosKomship(
          rootState.auth.userData.partner_detail.id,
        ).get('v1/dashboard/partner/balanceSummary')
        commit('UPDATE_ِِBALANCE_SUMMARY', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getOrderSummary({ commit, rootState }) {
      try {
        const response = await axiosKomship(
          rootState.auth.userData.partner_detail.id,
        ).get('v1/dashboard/partner/orderSummary')
        commit('UPDATE_ORDER_SUMMARY', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getTopAdminOrders({ commit, rootState }) {
      try {
        const response = await axiosKomship(
          rootState.auth.userData.partner_detail.id,
        ).get('v1/dashboard/partner/topAdminOrder', {
          params: {
            limit: 0,
          },
        })
        commit('UPDATE_TOP_ADMIN_ORDERS', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getCustomerLoyal({ commit, rootState }) {
      try {
        const response = await axiosKomship(
          rootState.auth.userData.partner_detail.id,
        ).get('v1/dashboard/partner/customerLoyal', {
          params: {
            limit: 3,
          },
        })
        console.log(response)
        commit('UPDATE_CUSTOMER_LOYALS', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getProdukTerlarises({
      commit, rootState, getters,
    }) {
      try {
        const response = await axiosKomship(
          rootState.auth.userData.partner_detail.id,
        ).get('v1/dashboard/partner/bestSellerProducts', {
          params: {
            start_date: getters.selectedProdukTerlaris[0],
            end_date: getters.selectedProdukTerlaris[1],
          },
        })
        commit('UPDATE_CUSTOMER_LOYALS', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
