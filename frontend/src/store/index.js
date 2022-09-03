import Vue from "vue";
import Vuex from "vuex";
import auth from "./Auth/index";
import comm from "./Community/index";
import user from "./User/index";

// import Config from "@/config";
// import axios from "axios";
Vue.use(Vuex);
const storeModules = { auth, comm, user };
const store = new Vuex.Store({
  modules: storeModules,
});
export default store;
