import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import API from './util/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    payments: [],
    current_payment: null
  },

  mutations: {
    SET_PAYMENTS (state, payload) {
      state.payments = payload;
    },

    SET_CURRENT_PAYMENT (state, payload) {
      state.current_payment = payload
    }
  },

  actions: {
    getAllPaymets({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(API.payment)
          .then((response) => {
            commit('SET_PAYMENTS', response.data)
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
      });
    },

    getPayment({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${API.payment}/${id}`)
          .then((response) => {
            commit('SET_CURRENT_PAYMENT', response.data)
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
      });
    },

    updateMyComment({ commit }, {id, comment}) {
      return new Promise((resolve, reject) => {
        axios.put(`${API.payment}/${id}`, {comment})
          .then((response) => {
            resolve(response.data);
          }).catch((error) => {
            reject(error);
          });
      });
    },

    addMoreReciept({ commit }, {id, receipt}) {
      return new Promise((resolve, reject) => {
        axios.post(`${API.payment}/${id}/receipts`, receipt)
          .then((response) => {
            resolve(response.data);
          }).catch((error) => {
            reject(error);
          });
      });
    }
  }
})
