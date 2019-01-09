import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import { Message, Scrollbar } from 'element-ui'
Vue.use(Scrollbar)
Vue.prototype.$message = Message

Vue.config.productionTip = false
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
// axios.defaults.baseURL = 'http://192.168.107.247/shangyu/index.php'
axios.defaults.baseURL = 'http://localhost/holiday/index.php/'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.readerUrl = 'http://10.139.242.102/readerApi/index.php'
var vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

global.vm = vm