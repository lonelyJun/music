import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/home'),
    },
    {
      path: '/login',
      component: () => import('@/components/login'),
    },
  ]
})