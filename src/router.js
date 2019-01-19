import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['./components/pages/Conception'], resolve),
    },
    {
      path: '/county',
      component: resolve => require(['./components/pages/county/Layout'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['./components/pages/county/index/Index'], resolve),
          meta: {
            hide: true
          }
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
    {
      path: '/ruler',
      component: resolve => require(['./components/pages/ruler/Index'], resolve),
      meta: {
        hide: true
      }
    },
    {
      path: '/policy',
      component: resolve => require(['./components/pages/policy/Layout'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['./components/pages/policy/article/Index'], resolve),
          meta: {
            hide: true
          }
        },
        {
          path: 'file',
          component: resolve => require(['./components/pages/policy/file/Index'], resolve),
          meta: {
            hide: true
          }
        },
      ]
    }
  ]
})