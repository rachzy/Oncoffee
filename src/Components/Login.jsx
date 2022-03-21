import React, { useEffect } from "react";

import setPageTitle from "../globalFunctions/setPageTitle";

import LoginRegisterContainer from "./Login/LoginRegisterContainer";

import "../css/login.css";

const Login = ({ setHeaderPageTitle, pageTitle }) => {
  useEffect(() => {
    setPageTitle(pageTitle);
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);

  return (
    <main className="conteudo-login">
      <main className="conteudo1-login">
        <LoginRegisterContainer />
      </main>
    </main>
  );
};

export default Login;
