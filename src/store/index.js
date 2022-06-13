import { createStore } from 'vuex'

export default createStore({
  state: {
    database: [],
    notWanted: ["suite", "geo"]
  },
  getters: {
  },
  mutations: {
    UPDATE_DATABASE(state, newData) {
      state.database = newData;
    }
  },
  actions: {
  },
  modules: {
  }
})
