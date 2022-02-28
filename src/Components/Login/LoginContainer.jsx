import React from "react";

import InputBox from "./LoginContainer/InputBox";
import LogReg from "./LoginContainer/LogReg";

const LoginContainer = () => {
  return (
    <main className="logincontainer">
      <h2>Bem-Vindo</h2>
      <input type="checkbox" id="logcheck" />
        <LogReg />
        <InputBox />
    </main>
  );
};

export default LoginContainer;
