import { getField, updateField } from 'vuex-map-fields'
import moment from 'moment'
import {
  axiosKomship, penghasilanValue, today, formatYmd, getDates,
} from '../helpers'

export default {
  namespaced: true,
  state: {
    cashback: 0,
    penghasilan7Hari: 0,
    penghasilan30Hari: 0,
    penghasilanTotal: 0,
    selectedPenghasilan: 'Kompship',
    optionsPenghasilan: ['Kompship'],
    dateRange: {
      startDate: today,
      endDate: today,
    },
    dataCod: {
      orderan: 0,
      sukses: 0,
      retur: 0,
      pKotor: 0,
      pBersih: 0,
      cashbackOngkir: 0,
      ongkir: 0,
      ongkirBersih: 0,
      biayaCod: 0,
    },
    dataTransfer: {
      orderan: 0,
      sukses: 0,
      retur: 0,
      pKotor: 0,
      pBersih: 0,
      cashbackOngkir: 0,
      ongkir: 0,
      ongkirBersih: 0,
      biayaCod: 0,
    },
    incomeCODGraph: [],
    incomeTransferGraph: [],
  },
  getters: {
    getField,
    selectedPenghasilan(state) {
      return penghasilanValue[state.selectedPenghasilan]
    },
    incomeTransferGraph(state) {
      return {
        labels: state.incomeTransferGraph.map(item => moment(new Date(item.date)).format('DD MMM')),
        datasets: [
          {
            label: 'Penghasilan Bersih',
            backgroundColor: '#08A0F7',
            data: state.incomeTransferGraph.map(item => item.net_income),
            lineTension: 0,
            pointRadius: 0,
          },
          {
            label: 'Penghasilan Kotor',
            backgroundColor: '#FBA63C',
            data: state.incomeTransferGraph.map(item => item.gross_income),
            lineTension: 0,
            pointRadius: 0,
          },
        ],
      }
    },
    incomeCODGraph(state) {
      return {
        labels: state.incomeCODGraph.map(item => moment(new Date(item.date)).format('DD MMM')),
        datasets: [
          {
            label: 'Penghasilan Bersih',
            backgroundColor: '#08A0F7',
            data: state.incomeCODGraph.map(item => item.net_income),
            lineTension: 0,
            pointRadius: 0,
          },
          {
            label: 'Penghasilan Kotor',
            backgroundColor: '#FBA63C',
            data: state.incomeCODGraph.map(item => item.gross_income),
            lineTension: 0,
            pointRadius: 0,
          },
        ],
      }
    },
  },
  mutations: {
    updateField,
    UPDATE_PENGHASILAN(state, penghasilan) {
      state.cashback = penghasilan.total_earn_cashback
      state.penghasilan7Hari = penghasilan.total_last_seven_days_income
      state.penghasilan30Hari = penghasilan.total_last_rhirty_days_income
      state.penghasilanTotal = penghasilan.total_income
    },
    UPDATE_DATA_COD(state, dataCod) {
      state.dataCod = {
        orderan: dataCod.total_cod_percentage,
        sukses: dataCod.total_cod_completed_percentage,
        retur: dataCod.total_cod_return_percentage,
        pKotor: dataCod.total_gross_income,
        pBersih: dataCod.total_net_income,
        cashbackOngkir: dataCod.shipping_cashback,
        ongkir: dataCod.total_shipping_cost,
        ongkirBersih: dataCod.total_net_shipping_cost,
        biayaCod: dataCod.total_cod_service_fee,
      }
    },
    UPDATE_DATA_TRANSFER(state, dataTransfer) {
      state.dataTransfer = {
        orderan: dataTransfer.total_bank_transfer_percentage,
        sukses: dataTransfer.total_bank_transfer_completed_percentage,
        retur: dataTransfer.total_bank_transfer_return_percentage,
        pKotor: dataTransfer.total_gross_income,
        pBersih: dataTransfer.total_net_income,
        cashbackOngkir: dataTransfer.shipping_cashback,
        ongkir: dataTransfer.total_shipping_cost,
        ongkirBersih: dataTransfer.total_net_shipping_cost,
        biayaCod: dataTransfer.total_cod_service_fee,
      }
    },
    UPDATE_COD_GRAPH(state, codGraph) {
      state.incomeCODGraph = getDates(state.dateRange.startDate, state.dateRange.endDate).map(date => {
        const income = codGraph.find(item => item.date === date)
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
    UPDATE_TRANSFER_GRAPH(state, transferGraph) {
      state.incomeTransferGraph = getDates(state.dateRange.startDate, state.dateRange.endDate).map(date => {
        const income = transferGraph.find(item => item.date === date)
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
  },
  actions: {
    async init({ dispatch }) {
      dispatch('getPenghasilan')
      dispatch('getDataCod')
      dispatch('getDataTransfer')
      dispatch('getIncomeTransferGraph')
      dispatch('getIncomeCODGraph')
    },
    async getPenghasilan({ commit, rootState }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/finance/partner/inComeSummary',
        )
        commit('UPDATE_PENGHASILAN', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getDataCod({
      commit, rootState, getters, state,
    }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/finance/partner/inComeSummary/COD',
          {
            params: {
              is_komship: getters.selectedPenghasilan,
              payment_method: 'COD',
              start_date: formatYmd(state.dateRange.startDate),
              end_date: formatYmd(state.dateRange.endDate),
            },
          },
        )
        commit('UPDATE_DATA_COD', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getDataTransfer({
      commit, rootState, getters, state,
    }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/finance/partner/inComeSummary/BankTransfer',
          {
            params: {
              is_komship: getters.selectedPenghasilan,
              start_date: formatYmd(state.dateRange.startDate),
              end_date: formatYmd(state.dateRange.endDate),
            },
          },
        )
        commit('UPDATE_DATA_TRANSFER', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getIncomeCODGraph({
      commit, state, rootState,
    }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/finance/partner/partnerIncomeGraph',
          {
            params: {
              start_date: formatYmd(state.dateRange.startDate),
              end_date: formatYmd(state.dateRange.endDate),
              is_komship: 1,
              payment_method: 'COD',
            },
          },
        )
        commit('UPDATE_COD_GRAPH', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getIncomeTransferGraph({
      commit, state, rootState,
    }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          'v1/finance/partner/partnerIncomeGraph',
          {
            params: {
              start_date: formatYmd(state.dateRange.startDate),
              end_date: formatYmd(state.dateRange.endDate),
              is_komship: 1,
              payment_method: 'BANK TRANSFER',
            },
          },
        )
        commit('UPDATE_TRANSFER_GRAPH', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
