import { getField, updateField } from 'vuex-map-fields'
import {
  axiosKompack,
} from '@/store/helpers'

export default {
  namespaced: true,
  state: {
    selecOptData: {
      building: [],
      ownership: [],
    },
  },
  getters: {
    getField,
    getselecOptData(state) {
      return state.selecOptData
    },
  },
  mutations: {
    updateField,
    UPDATE_ِِSELECT_OPTIONDATA(state, optdata) {
      state.selecOptData = {
        ...state.selecOptData,
        ...optdata,
      }
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch('getSelectOptDataAPI')
    },
    async getSelectOptDataAPI({ commit, rootState }) {
      try {
        const { data } = await axiosKompack().get('/kompack/select-option')
        const buildingType = [
          {
            value: null,
            text: 'Pilih jenis bangunan',
          },
        ]
        const ownerShip = [
          {
            value: null,
            text: 'Pilih jenis kepemilikan',
          },
        ]
        data.data.ownership.forEach(x => {
          ownerShip.push({
            value: x.id,
            text: x.name,
          })
        })
        data.data.building.forEach(x => {
          buildingType.push({
            value: x.id,
            text: x.name,
          })
        })
        commit('UPDATE_ِِSELECT_OPTIONDATA', {
          building: buildingType,
          ownership: ownerShip,
        })
      } catch (e) {
        console.error(e)
      }
    },
    // async getPartnerIncomeGraph({
    //   commit, getters, state, rootState,
    // }) {
    //   try {
    //     const partnerId = rootState.auth.userData.partner_detail.id
    //     const response = await axiosKomship(partnerId).get(
    //       'v1/finance/partner/partnerIncomeGraph',
    //       {
    //         params: {
    //           start_date: state.startDateChart,
    //           end_date: state.endDateChart,
    //           is_komship: 1,
    //           payment_method: getters.selectedChart,
    //         },
    //       },
    //     )
    //     commit('UPDATE_PARTNER_INCOME_GRAPH', response.data.data)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // },
  },
}
