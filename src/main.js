import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import 'element-ui/lib/theme-chalk/index.css'
import { Message, Scrollbar, Pagination, Checkbox, ColorPicker } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
Vue.use(Scrollbar)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(ColorPicker)
Vue.component(CollapseTransition)
Vue.prototype.$message = Message


Vue.config.productionTip = false
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
// axios.defaults.baseURL = 'http://192.168.107.247/shangyu/index.php'
axios.defaults.baseURL = 'http://localhost/holiday/index.php/'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
var vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

global.vm = vm