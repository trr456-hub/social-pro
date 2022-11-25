import React from "react";
import { authService } from "fbase";
import { firebaseInstance } from "../fbase";
import AuthForm from "components/AuthForm";
// persistence : 사용자를 어떻게 기억할것인지 선택할수있게 하는 firebase함수
const Auth = () => {
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
      <AuthForm />
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
