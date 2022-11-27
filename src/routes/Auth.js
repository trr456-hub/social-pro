import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
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
    await authService.signInWithPopup(provider);
    //console.log(data);
  };
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faHandshake}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Google로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Github로그인 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
