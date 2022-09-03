import action from "./action";
import getters from "./getters";
import mutations from "./mutation";
import state from "./state";

export default {
  namespaced: true,
  actions: action,
  mutations: mutations,
  state: state,
  getters: getters,
};
