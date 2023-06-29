const shortid = require("shortid");

const initialTodos = [
  {
    id: shortid.generate(),
    title: "제목1",
    body: "내용1",
    isDone: false,
  },
  {
    id: shortid.generate(),
    title: "제목2",
    body: "내용2",
    isDone: true,
  },
  {
    id: shortid.generate(),
    title: "제목3",
    body: "내용3",
    isDone: false,
  },
  {
    id: shortid.generate(),
    title: "제목4",
    body: "내용4",
    isDone: true,
  },
];

const todos = (state = initialTodos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "REMOVE_TODO":
      const removedTodo = state.filter((todo) => {
        return todo.id !== action.payload;
      });
      return removedTodo;
    case "SWITCH_TODO":
      const swithedTodo = state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });
      return swithedTodo;
    default:
      return state;
  }
};

export default todos;
