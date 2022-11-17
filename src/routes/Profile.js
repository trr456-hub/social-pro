import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/"); // 로그아웃 된 후 다시 홈으로 돌아갈수있게
  };
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
