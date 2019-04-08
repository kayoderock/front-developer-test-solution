import store from '../store';

export class Payment {
  static getAllPayments() {
    store.dispatch('getAllPaymets')
      .then((response) => {
        store.commit('SET_PAYMENTS', response);
      }).catch( error => {
        const res = error.response;
        console.log(res)
    });
  }
}
