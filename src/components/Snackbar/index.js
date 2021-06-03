import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import Snackbar from "./Snackbar.vue";

const v = new Vue({
  vuetify,
  render(createElement) {
    return createElement(Snackbar);
  }
});

v.$mount();

document.body.appendChild(v.$el);

const snackbar = v.$children[0];

function info(msg) {
  snackbar.info(msg);
}

function error(msg) {
  snackbar.error(msg);
}

function warning(msg) {
  snackbar.warning(msg);
}

function success(msg) {
  snackbar.success(msg);
}

export default {
  info,
  success,
  warning,
  error
};
