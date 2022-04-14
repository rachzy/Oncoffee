import React, { useRef, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Axios from "axios";

import Input from "../../Input";
import Error from "../../Error";

import { GlobalServerContext } from "../../../../App";

const LoginInputs = () => {
  const getGlobalServerContext = useContext(GlobalServerContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPage = searchParams.get("next");

  const [inputValues, setInputValues] = useState({ user: "", password: "" });
  const [errorValues, setErrorValues] = useState([
    {
      name: "user",
      text: "",
    },
    {
      name: "password",
      text: "",
    },
  ]);
  const [mainErrorValue, setMainErrorValue] = useState("");

  const loginInputColumn = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const proxBtn = useRef(null);
  const handleButtonClick = () => {
    proxBtn.current.classList.add("loading");
    const executeLogin = async () => {
      try {
        const { data } = await Axios.post(
          `${getGlobalServerContext.serverUrl}/account/login`,
          {
            emailcpf: inputValues.user,
            pass: inputValues.password,
          },
          {
            withCredentials: true,
          }
        );

        if (data.isError) {
          proxBtn.current.classList.remove("loading");
          switch (data.errorCode) {
            case "INVALID_CREDENTIALS":
              return setErrorValues([
                {
                  name: "user",
                  text: "Email ou CPF inválidos",
                },
                {
                  name: "password",
                  text: "Senha inválida",
                },
              ]);
            default:
              return setMainErrorValue(
                `Ocorreu um erro ao tentar efetuar o login: ${data.errorCode}`
              );
          }
        }

        if (data.queryStatus === 200) {
          if (!nextPage || nextPage === null || nextPage === "") {
            return navigate("/");
          }
          return navigate(`/${nextPage}`);
        }
      } catch (err) {
        proxBtn.current.classList.remove("loading");
        switch (err.response.status) {
          case 429:
            setMainErrorValue(
              "Você realizou muitas tentativas em um curto período de tempo, tente novamente mais tarde."
            );
            break;
          default:
            setMainErrorValue(`Ocorreu um erro interno do servidor: ${err}`);
        }
      }
    };
    executeLogin();
  };

  const inputLoginPassword = document.querySelector("#input-login-password");
  const handleShowPasswordClick = () => {
    const newType =
      inputLoginPassword.getAttribute("type") === "password"
        ? "text"
        : "password";
    inputLoginPassword.setAttribute("type", newType);
  };

  return (
    <>
      <div ref={loginInputColumn} className="loginputcolumn1">
        <Input
          name="user"
          id="input-login-email"
          type="text"
          className="logmail"
          placeholder="E-mail ou Cpf"
          onChange={handleChange}
          value={inputValues.user}
        />
        <Error
          id={errorValues[0].id}
          text={errorValues[0].text}
          style={{ height: "20px" }}
        />
        <div className="inputpassword">
          <Input
            name="password"
            id="input-login-password"
            type="password"
            className="logpassword"
            placeholder="Senha"
            onChange={handleChange}
            value={inputValues.password}
          />
          <input type="checkbox" id="passwordcheck" />
          <label
            onClick={handleShowPasswordClick}
            className="eyepassword"
            htmlFor="passwordcheck"
          >
            <i className="far fa-eye"></i>
          </label>
        </div>
        <Error
          id={errorValues[1].id}
          text={errorValues[1].text}
          style={{ height: "20px" }}
        />
      </div>
      <Error text={mainErrorValue} style={{textAlign: "center", height: "30px", marginBottom: "10px"}} />
      <input
        type="button"
        className="proxbtt"
        onClick={handleButtonClick}
        ref={proxBtn}
        value="Entrar"
      />
    </>
  );
};

export default LoginInputs;
