import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    payments: []
  },

  mutations: {
    SET_PAYMENTS (state, payload) {
      state.payments = payload;
    }
  },

  actions: {
    getAdminDetails({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(API.payemts)
          .then((response) => {
            commit('SET_PAYMENTS', response)
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
      });
    },
  }
})
