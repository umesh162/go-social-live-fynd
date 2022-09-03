import Config from "@/config";
import axios from "axios";
export default {
  async createCommunity(temp, payload) {
    try {
      let res = await axios.post(
        `${Config.baseUrl}/community/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async getAllCOmmunity({ commit }) {
    try {
      const { data } = await axios.post(
        `${Config.baseUrl}/community/getAll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      commit("getAllComm", data);
    } catch (e) {
      console.log();
    }
  },
  async joinCommunity(_, payload) {
    console.log("From action", payload);
    try {
      let response = await axios.post(
        `${Config.baseUrl}/community/joinCommunity`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return {
        code: response.status,
        msg: response.data.msg,
      };
    } catch (e) {
      return {
        code: e.response.status,
        msg: e.response.data.msg,
      };
    }
  },

  async acceptRequest(temp, payload) {
    try {
      let res = await axios.post(
        `${Config.baseUrl}/community/acceptMember`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res, res && payload.isAccept);
      if (res && payload.isAccept) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async editCommunity(temp, payload) {
    try {
      let res = await axios.post(
        `${Config.baseUrl}/community/editCommunity`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async leaveCommunity(temp, payload) {
    try {
      let res = await axios.post(
        `${Config.baseUrl}/community/leaveCommunity`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async deleteCommunity(temp, payload) {
    try {
      let res = await axios.post(
        `${Config.baseUrl}/community/deleteCommunity`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async getUserJoinComm({ commit }, payload) {
    try {
      const { data } = await axios.post(
        `${Config.baseUrl}/community/userCommunity`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      commit("getUserJoinedComm", data);
    } catch (e) {
      console.log();
    }
  },

  async singleChannInfo({ commit }, payload) {
    try {
      const { data } = await axios.post(
        `${Config.baseUrl}/community/getSingleCommunity`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      commit("getSingleChannInfo", data);
    } catch (e) {
      console.log(e);
    }
  },

  async CommAllPost({ commit }, payload) {
    try {
      const { data } = await axios.post(
        `${Config.baseUrl}/posts/getByCommunity`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      commit("getCommPost", data);
    } catch (e) {
      console.log(e);
    }
  },

  async CreatePost({ commit }, payload) {
    try {
      const response = await axios.post(
        `${Config.baseUrl}/posts/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      commit("addPost", response.data);
      return {
        code: response.status,
        msg: response.data.msg,
      };
    } catch (e) {
      return {
        code: e.response.status,
        msg: e.response.data.msg,
      };
    }
  },

  async DeletePost(temp, payload) {
    try {
      await axios.post(`${Config.baseUrl}/posts/deleteMyPost`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  async LikePost(temp, payload) {
    try {
      await axios.post(`${Config.baseUrl}/likes/likePost`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // commit("addPost", data);
    } catch (e) {
      console.log(e);
    }
  },

  async UnLikePost(temp, payload) {
    try {
      await axios.post(`${Config.baseUrl}/likes/removelike`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(localStorage.getItem("token"));

      // commit("addPost", data);
    } catch (e) {
      console.log(e);
    }
  },

  async Comment({ commit }, payload) {
    try {
      const { data } = await axios.post(
        `${Config.baseUrl}/comment/addAComment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      commit("allComments", data);
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

  async allComments({ commit }, payload) {
    try {
      commit("getComments", payload);
    } catch (e) {
      console.log(e);
    }
  },
};
