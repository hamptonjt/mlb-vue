import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import buefy from 'buefy'
import 'buefy/dist/buefy.css'
import bulma from 'bulma'

Vue.use(bulma)
Vue.use(buefy)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
