import { combineReducers, createStore } from "redux";
import todos from "../modules/todos";
import comments from "../modules/comments";

const rootReducer = combineReducers({
  todos: todos,
  comments: comments,
});

const store = createStore(rootReducer);

export default store;
