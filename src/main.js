import Vue from 'vue'
import App from './App.vue'
import Storage from "vue-ls";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import router from "@/router";
import i18n from "@/plugins/i18n";
import theme from "@/plugins/theme";
import fullscreen from "@/plugins/fullscreen";
import notifications from "@/plugins/notifications";
import contrastChecker from "@/plugins/contrastChecker";
import http from "@/plugins/http";
import keystrokes from "@/plugins/keystrokes";
import news from "@/plugins/news";

const lsOptions = {
  namespace: 'manager__',
  storage: 'local'
};

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Storage, lsOptions);
Vue.use(notifications);
Vue.use(http);
Vue.use(theme);
Vue.use(fullscreen);
Vue.use(contrastChecker);
Vue.use(keystrokes);
Vue.use(news);

// TODO: verander van localhost naar de goede website
// Vue.prototype.$apiEndpoint = `http://192.168.2.9:8000/`;
Vue.prototype.$apiEndpoint = 'http://localhost:8000/';
Vue.prototype.$corsProxy = 'http://0.0.0.0:8001/';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');
