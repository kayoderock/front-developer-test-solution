import store from '../store';

export class Payments {
  static getAllPayments() {
    store.dispatch('getAllPaymets')
      .then((response) => {
        store.commit('SET_PAYMENTS', response);
      }).catch((error) => {
        const res = error.response;

        if (!res) {
          this.$notify.error({
            title: '',
            message: 'An error occured while loading your payments',
            showClose: false,
          }); 
          return;
        }
    });
  }
}
