import React, { useEffect } from "react";

import setPageTitle from "../globalFunctions/setPageTitle";

import LoginContainer from "./Login/LoginContainer";

import "../css/login.css";

const Login = ({ setHeaderPageTitle, pageTitle }) => {
  
  useEffect(() => {
    setPageTitle(pageTitle);
    setHeaderPageTitle(pageTitle);
  }, [pageTitle]);

  return (
    <main className="conteudo-login">
      <main className="conteudo1-login">
        <LoginContainer />
      </main>
    </main>
  );
};

export default Login;
