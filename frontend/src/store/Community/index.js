import action from "./action";
import mutations from "./mutation";
import state from "./state";

export default {
  namespaced: true,
  actions: action,
  mutations: mutations,
  state: state,
};
