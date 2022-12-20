import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import setPageTitle from "../globalFunctions/setPageTitle";
import LoginRegisterContainer from "../Components/Login/LoginRegisterContainer";

import "../css/login.css";

import { GlobalServerContext } from "../App";

const Login = ({ pageTitle, setHeaderPageTitle }) => {
  const navigate = useNavigate();
  const { isLogged } = useContext(GlobalServerContext);

  useEffect(() => {
    if (isLogged) return navigate("/");
    setPageTitle(pageTitle);
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle, isLogged, navigate]);

  return (
    <main className="conteudo-login">
      <main className="conteudo1-login">
        <LoginRegisterContainer />
      </main>
    </main>
  );
};

export default Login;
