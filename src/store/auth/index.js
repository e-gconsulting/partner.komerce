export default {
  namespaced: true,
  state: {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {},
  },
  mutations: {
    UPDATE_USER_DATA(state, val) {
      state.userData = val
    },
  },
  actions: {},
}
