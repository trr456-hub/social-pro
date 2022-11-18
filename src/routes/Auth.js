import React, { useState } from "react";
import { authService } from "fbase";
import { firebaseInstance } from "../fbase";
// persistence : 사용자를 어떻게 기억할것인지 선택할수있게 하는 firebase함수
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value }, // target 안에 name, value값을 넣어줌
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
      let data;
      if (newAccount) {
        //계정생성
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      //console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    // console.log(e.target.name);
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    //console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email.."
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password.."
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "계정생성" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "계정생성"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Google로그인
        </button>
        <button name="github" onClick={onSocialClick}>
          Github로그인
        </button>
      </div>
    </div>
  );
};
export default Auth;
