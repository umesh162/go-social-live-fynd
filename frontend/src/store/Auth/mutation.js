export default {
  loginUser(state, payload) {
    console.log("They caled me");
    state.user = payload;
    state.userDetails = payload;
  },
  registerSuccess(state, payload) {
    state.succ = payload;
  },
};
