import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import API from './util/api'

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
    getAllPaymets({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(API.payment)
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
