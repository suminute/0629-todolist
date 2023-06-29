const shortid = require("shortid");

const initialComments = [];

const comments = (state = initialComments, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];
    case "REMOVE_COMMENT":
      const removedComment = state.filter((state) => state.id !== action.payload);
      return removedComment;
    case "MODIFY_COMMENT":
      const modifiedComment = state.map((state) => {
        if (state.id === action.payload.id) {
          return { ...state, body: action.payload.body };
        } else {
          return state;
        }
      });
      return modifiedComment;
    default:
      return state;
  }
};

export default comments;
