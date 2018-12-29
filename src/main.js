// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueI18n from 'vue-i18n'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import LocalStore from './js/localStorage'

import LangEN from './js/i18n/en'
import LangZH from './js/i18n/zh'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VueMaterial)

const i18n = new VueI18n({
  locale: LocalStore.GetLang('en'),  // 语言标识
  messages: {
    'en': LangEN,
    'zh': LangZH,
  }
})

window.$I18n = i18n

window.introJs = require('intro.js')
import VueIntro from 'vue-introjs'
Vue.use(VueIntro)

import 'intro.js/introjs.css';

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  components: { App },
  template: "<App/>"
}).$mount('#app')
