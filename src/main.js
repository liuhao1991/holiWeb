import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import { Message } from 'element-ui'
Vue.prototype.$message = Message

Vue.config.productionTip = false
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
axios.defaults.baseURL = 'http://localhost/holiday/index.php/'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
var vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

global.vm = vm