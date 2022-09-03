import Config from "@/config";
import axios from "axios";
export default {
  async updateUser(temp, payload) {
    try {
      const { data } = await axios.post(
        `${Config.baseUrl}/user/profileChange`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      // commit("getAllComm", data);
      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async getMyDetails({ commit }, payload) {
    try {
      const { data } = await axios.post(
        `${Config.baseUrl}/user/getMyDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      commit("auth/loginUser", data, { root: true });
      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
