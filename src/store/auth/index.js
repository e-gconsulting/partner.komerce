export default {
  namespaced: true,
  state: {
    userData: JSON.parse(localStorage.getItem('userData')) ? localStorage.getItem('userData') : {},
  },
  mutations: {
    UPDATE_USER_DATA(state, val) {
      state.userData = val
    },
  },
  actions: {},
}
