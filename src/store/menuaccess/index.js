export default {
  namespaced: true,
  state: {
    userMenuAccess: [],
  },
  mutations: {
    UPDATE_USER_MENU_ACCESS(state, val) {
      state.userMenuAccess = val
    },
  },
  actions: {},
}
