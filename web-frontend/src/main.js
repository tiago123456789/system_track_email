import Vue from 'vue'
import VueToaster from "vue-toastr"
import { BootstrapVue } from "bootstrap-vue";
import App from './App.vue'
import routesApp from "./route";

Vue.config.productionTip = false

Vue.component("vue-toastr", VueToaster);
Vue.use(VueToaster);
Vue.use(BootstrapVue);

new Vue({
  router: routesApp,
  render: h => h(App),
}).$mount('#app')
