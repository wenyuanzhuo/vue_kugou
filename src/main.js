// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import mint from 'mint-ui'
import router from './router'
import store from './store'
import axios from 'axios'
import 'mint-ui/lib/style.css'
Vue.use(mint)
Vue.config.productionTip = false
Vue.prototype.$http = axios 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
