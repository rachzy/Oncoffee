import React, { useRef, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Axios from "axios";

import Input from "../../Input";
import Error from "../../Error";

import { GlobalServerContext } from "../../../../App";

const LoginInputs = () => {
  const { serverUrl, setUserSessionState, setIsLogged } =
    useContext(GlobalServerContext);

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

  //Function that will manipulate the errorValues in an easiest and fast way
  //type: the error type, if not specified it will just clean all the errors
  //options (optional): additional info that some types of errors need to work properly
  const manageErrorValues = (type, options) => {
    switch (type) {
      //Clean all the errors messages
      case "clean":
        const cleanErrorValues = errorValues.map((input) => {
          return {
            name: input.name,
            text: "",
          };
        });
        setErrorValues(cleanErrorValues);
        break;
      //Clean a single error message
      case "singleclean":
        const singleCleanErrorValues = errorValues.map((input) => {
          if (input.name !== options.name) return input;
          return {
            name: input.name,
            text: "",
          };
        });
        setErrorValues(singleCleanErrorValues);
        break;
      case "empty":
        const singleEmptyErrorValues = errorValues.map((input) => {
          if (input.name !== options.name) return input;
          return {
            name: input.name,
            text: "Preencha esse campo",
          };
        });
        setErrorValues(singleEmptyErrorValues);
        break;
      case "invalid":
        const invalidErrorValues = errorValues.map((input) => {
          switch (input.name) {
            case "user":
              return {
                name: "user",
                text: "Email ou CPF inválido",
              };
            case "password":
              return {
                name: "password",
                text: "Senha inválida",
              };
            default:
              return null;
          }
        });
        setErrorValues(invalidErrorValues);
        break;
      default:
        manageErrorValues("clean");
    }
  };

  const loginInputColumn = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    const options = {
      name: name,
    };

    manageErrorValues("singleclean", options);

    if (inputValues[name] === "") {
      return manageErrorValues("empty", options);
    }
  };

  const proxBtn = useRef(null);

  const handleButtonClick = () => {
    proxBtn.current.classList.add("loading");
    manageErrorValues("clean");
    setMainErrorValue("");

    const validateInputs = () => {
      const { user, password } = inputValues;

      if (!user) {
        const options = {
          name: "user",
        };
        proxBtn.current.classList.remove("loading");
        return manageErrorValues("empty", options);
      }

      if (!password) {
        const options = {
          name: "password",
        };
        proxBtn.current.classList.remove("loading");
        return manageErrorValues("empty", options);
      }

      executeLogin();
    };

    const executeLogin = async () => {
      try {
        const { data } = await Axios.post(
          `${serverUrl}/account/login`,
          {
            emailcpf: inputValues.user,
            password: inputValues.password,
          },
          {
            withCredentials: true,
          }
        );

        if (data.isError) {
          proxBtn.current.classList.remove("loading");
          switch (data.errorCode) {
            case "INVALID_CREDENTIALS":
              manageErrorValues("invalid");
              break;
            default:
              return setMainErrorValue(
                `Ocorreu um erro ao tentar efetuar o login: ${data.errorCode}`
              );
          }
        }

        if (data.queryStatus === 200) {
          setUserSessionState(data.userData); //Set UserSession with user's data
          setIsLogged(true);

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

    validateInputs();
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
    <form method="POST">
      <div ref={loginInputColumn} className="loginputcolumn1">
        <Input
          name="user"
          id="input-login-email"
          type="text"
          className="logmail"
          placeholder="E-mail ou Cpf"
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputValues.user}
        />
        <Error id={errorValues[0].id} text={errorValues[0].text} />
        <div className="inputpassword">
          <Input
            name="password"
            id="input-login-password"
            type="password"
            className="logpassword"
            placeholder="Senha"
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputValues.password}
            form="login"
            isLastInput
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
        <Error id={errorValues[1].id} text={errorValues[1].text} />
      </div>
      <Error
        style={{ textAlign: "center", marginTop: "10px", height: "30px" }}
        text={mainErrorValue}
      />
      <input
        type="button"
        id="loginBtn"
        className="proxbtt"
        onClick={handleButtonClick}
        ref={proxBtn}
        value="Entrar"
      />
    </form>
  );
};

export default LoginInputs;
