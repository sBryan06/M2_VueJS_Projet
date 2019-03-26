/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/fr'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

import store from './store.js'

new Vue({
  router,
  store,

  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  render: h => h(App)
}).$mount('#app')
