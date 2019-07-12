import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-material-design-icons/styles.css';

import App from './App.vue';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
