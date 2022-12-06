import { authService } from "fbase";
import React, { useState } from "react";
//import "../modalStyle.css";

const AuthWindow = ({ setModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e) => {
    // console.log(e.target.value);
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    //console.log(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);
      //회원가입
    } catch (error) {
      // 에러창 도출
      setError(error.message);
    }
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <div className="modalContainer">
        <button className="close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onSubmit} className="loginForm">
          <input
            name="email"
            type="email"
            placeholder="Email.."
            required
            value={email}
            className="authInput"
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password.."
            required
            value={password}
            className="authInput"
            onChange={onChange}
          />
          <input
            type="submit"
            className="authInput authSubmit"
            value="회원가입"
          />
          {error && <span className="authError">{error}</span>}
        </form>
      </div>
    </>
  );
};

export default AuthWindow;
