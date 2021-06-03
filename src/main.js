import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { get, post, patch, put, del } from "./util/htttp";
import snackbar from "./components/Snackbar/";

Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$del = del;
Vue.prototype.$snackbar = snackbar;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
