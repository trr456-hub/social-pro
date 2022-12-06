import React, { useState } from "react";
import { authService } from "fbase";
import AuthWindow from "./AuthWindow";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const onChange = (e) => {
    const {
      target: { name, value }, // target 안에 name, value값을 넣어줌
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // console.log(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //계정생성
      //await authService.createUserWithEmailAndPassword(email, password);
      //로그인
      await authService.signInWithEmailAndPassword(email, password);
      //console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const setWindow = () => {
    setModal(true);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email.."
          required
          value={email}
          onChange={onChange}
          className="authInput"
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
        <input type="submit" className="authInput authSubmit" value="로그인" />
        {error && <span className="authError">{error}</span>}
      </form>
      <div>
        <span onClick={setWindow} className="authSwitch">
          회원가입
        </span>
        {modal && <AuthWindow setModal={setModal} />}
      </div>
    </>
  );
};

export default AuthForm;
