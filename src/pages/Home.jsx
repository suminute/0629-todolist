import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shortid from "shortid";

const Home = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: shortid.generate(),
        title,
        body,
        isDone: false,
      },
    });
    setTitle("");
    setBody("");
  };

  const removeTodo = (todoId) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todoId,
    });
  };

  const switchTodo = (todoId) => {
    dispatch({
      type: "SWITCH_TODO",
      payload: todoId,
    });
  };

  const style = {
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <label>할 일</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>내용</label>
        <input
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <button>저장</button>
      </form>
      <div>
        <h2>할 일 목록</h2>
        {todos
          .filter((todo) => todo.isDone === false)
          .map((todo) => {
            return (
              <div key={todo.id} style={style}>
                <Link to={`/detail/${todo.id}`}>상세페이지</Link>
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
                <p>{todo.isDone.toString()}</p>
                <button onClick={() => removeTodo(todo.id)}>삭제</button>
                <button onClick={() => switchTodo(todo.id)}>완료</button>
              </div>
            );
          })}
      </div>
      <div>
        <h2>완료 목록</h2>
        {todos
          .filter((todo) => todo.isDone === true)
          .map((todo) => {
            return (
              <div key={todo.id} style={style}>
                <Link to={`/detail/${todo.id}`}>상세페이지</Link>
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
                <p>{todo.isDone.toString()}</p>
                <button onClick={() => removeTodo(todo.id)}>삭제</button>
                <button onClick={() => switchTodo(todo.id)}>취소</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
