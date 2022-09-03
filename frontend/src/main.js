import Vue from "vue";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App.vue";
import "./index.css";
import "flowbite";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import store from "./store/index";
import Vuelidate from "vuelidate";
import Router from "vue-router";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
