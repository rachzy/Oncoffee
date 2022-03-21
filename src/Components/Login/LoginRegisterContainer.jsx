import React from "react";

import InputBox from "./LoginRegisterContainer/InputBox";
import LogReg from "./LoginRegisterContainer/LogReg";

const LoginRegisterContainer = () => {
  return (
    <main className="logincontainer">
      <h2>Bem-Vindo</h2>
      <input type="checkbox" id="logcheck" />
        <LogReg />
        <InputBox />
    </main>
  );
};

export default LoginRegisterContainer;
