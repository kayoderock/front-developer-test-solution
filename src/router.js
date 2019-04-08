import Vue from 'vue'
import Router from 'vue-router'

import Container from './views/Container.vue'
import Payments from './views/payments/Payments.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'container',
      component: Container,
      children: [
        {
          path: '',
          name: 'payments',
          component: Payments
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
