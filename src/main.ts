import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// Lib
import "./plugins/element.js";
import "@/plugins/axios";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
