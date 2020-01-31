import Vue from 'vue'
import App from './App.vue'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import router from "@/router";
import i18n from "@/plugins/i18n";
import Storage from "vue-ls";

const lsOptions = {
  namespace: 'manager__',
  storage: 'local'
};

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Storage, lsOptions);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');
