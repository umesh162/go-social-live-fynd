import Config from "@/config";
import axios from "axios";
export default {
  async loginUserAction({ commit }, payload) {
    try {
      const response = await axios.post(
        `${Config.baseUrl}/auth/Login`,
        payload
      );

      commit("loginUser", response.data);
      localStorage.setItem(Config.TOKEN_KEY, response.data.token);
      return {
        code: response.status,
        msg: response.data.message,
      };
    } catch (e) {
      return {
        code: e.response.status,
        msg: e.response.data.message,
      };
    }
  },

  logout() {
    localStorage.removeItem(Config.TOKEN_KEY, "");
    return true;
  },
  async registerUserAction({ commit }, payload) {
    try {
      let response = await axios.post(
        `${Config.baseUrl}/auth/Register`,
        payload
      );
      commit("registerSuccess", "Register success");
      return {
        code: response.status,
        msg: response.data.message,
      };
    } catch (e) {
      console.log(e.response);
      return {
        code: e.response.status,
        msg: e.response.data.message,
      };
    }
  },
};
