export default {
  namespaced: true,
  state: {
    id: null,
    status: '',
  },
  mutations: {
    UPDATE_PENCAIRAN_ID(state, val) {
      state.id = val
    },
    UPDATE_PENCAIRAN_STATUS(state, val) {
      state.status = val
    },
  },
  actions: {},
}
