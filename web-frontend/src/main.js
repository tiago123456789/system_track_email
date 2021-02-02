import Vue from 'vue'
import VueToaster from "vue-toastr"
import { BootstrapVue } from "bootstrap-vue";
import App from './App.vue'
import routesApp from "./route";
import Authorizator from "./components/auth/Authorizator";
import CKEditor from "ckeditor4-vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false


library.add(faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("vue-toastr", VueToaster);
Vue.component("authorizator", Authorizator)
Vue.use(VueToaster);
Vue.use(CKEditor);

Vue.use(BootstrapVue);

new Vue({
  router: routesApp,
  render: h => h(App),
}).$mount('#app')
