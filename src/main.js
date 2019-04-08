import Vue from 'vue'
import ElementUI from 'element-ui';
import Moment from 'moment';
import locale from 'element-ui/lib/locale/lang/en';
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { locale });
Vue.prototype.Moment = Moment;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
