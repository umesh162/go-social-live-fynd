export default {
  getAllComm(state, payload) {
    state.commList = payload;
  },
  getUserJoinedComm(state, payload) {
    state.userJoinComm = payload;
  },
  getSingleChannInfo(state, payload) {
    state.singleChannel = payload;
  },
  getCommPost(state, payload) {
    state.commPost = payload;
  },
  addPost(state, payload) {
    state.commPost.push(payload);
  },
  allComments(state, payload) {
    state.comments.push(payload);
  },
  getComments(state, payload) {
    state.allComments = payload;
  },
};
