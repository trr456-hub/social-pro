import { authService } from "fbase";
import React, { useState } from "react";

const AuthWindow = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    try {
      //회원가입
      await authService.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      // 에러창 도출
      setError(error.message);
    }
  };
  return (
    <form>
      <input
        name="email"
        type="email"
        placeholder="Email.."
        required
        value={email}
        className="authInput"
      />
      <input
        name="password"
        type="password"
        placeholder="Password.."
        required
        value={password}
        className="authInput"
      />
    </form>
  );
};

export default AuthWindow;
