import React from "react";

import LoginInputs from "./LoginBox/LoginInputs";
import LoginWith from "./LoginBox/LoginWith";

const LoginBox = () => {
  return (
    <div className="loginbox active">
      <LoginInputs />
      <p className="ou">Ou</p>
      <LoginWith />
    </div>
  );
};

export default LoginBox;
