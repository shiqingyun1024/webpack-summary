import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import axios from 'axios'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

// const instance = axios.create()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
