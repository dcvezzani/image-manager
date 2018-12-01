// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
require('./assets/sass/main.scss');

Vue.use(VueSocketio, io('http://localhost:3050', { path: '/io-photos'}));

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
