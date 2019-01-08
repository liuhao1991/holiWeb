import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['./components/pages/Conception'], resolve)
    },
    {
      path: '/county',
      component: resolve => require(['./components/pages/county/Layout'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['./components/pages/county/index/Index'], resolve)
        },
        {
          path: 'detail',
          component: resolve => require(['./components/pages/county/detail/Index'], resolve)
        },
        {
          path: 'weight',
          component: resolve => require(['./components/pages/county/weight/Index'], resolve)
        }
      ]
    },

  ]
})