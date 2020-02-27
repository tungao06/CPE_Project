import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import firebase from 'firebase'

import VuejsonToCsv from 'vue-json-to-csv'
import vueXlsxTable from 'vue-xlsx-table'

Vue.use(vueXlsxTable, { rABS: false })

Vue.use(VuejsonToCsv)

const firebaseConfig = {
  apiKey: "AIzaSyCi4n56vr9hO9_-xu_k4dCaotYtBAKm-Lo",
  authDomain: "cpe-project-register.firebaseapp.com",
  databaseURL: "https://cpe-project-register.firebaseio.com",
  projectId: "cpe-project-register",
  storageBucket: "cpe-project-register.appspot.com",
  messagingSenderId: "49136469351",
  appId: "1:49136469351:web:9a6a5825b2188da33f1bc2"
};

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
