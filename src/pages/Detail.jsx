import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail = () => {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos);

  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const addComment = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_COMMENT",
      payload: {
        id: shortid.generate(),
        postId: id,
        body: body,
        userName: userName,
        password: password,
      },
    });
    setBody("");
    setPassword("");
    setUserName("");
  };

  const removeComment = (comment) => {
    const pwd = prompt("비밀번호를 입력하세요!");
    if (pwd === comment.password) {
      dispatch({
        type: "REMOVE_COMMENT",
        payload: comment.id,
      });
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  const modifyComment = (comment) => {
    const pwd = prompt("비밀번호를 입력하세요!");
    if (pwd === comment.password) {
      const modifiedBody = prompt("수정할 내용을 입력하세요!");
      dispatch({
        type: "MODIFY_COMMENT",
        payload: { id: comment.id, body: modifiedBody },
      });
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };
  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}>
          이전페이지
        </button>
        {todos
          .filter((todo) => todo.id === id)
          .map((todo) => {
            return (
              <div key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
                <p>{todo.isDone.toString()}</p>
              </div>
            );
          })}
      </div>
      <form onSubmit={addComment}>
        <label>글쓴이</label>
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label>댓글</label>
        <input
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>저장</button>
      </form>
      {comments
        .filter((comment) => comment.postId === id)
        .map((comment) => {
          return (
            <div key={comment.password}>
              <p>{comment.userName}</p>
              <p>{comment.body}</p>
              <button onClick={() => modifyComment(comment)}>수정</button>
              <button onClick={() => removeComment(comment)}>삭제</button>
            </div>
          );
        })}
    </>
  );
};

export default Detail;
