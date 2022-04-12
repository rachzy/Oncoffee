import React, { useRef, useState } from "react";

import Input from "../../Input";
import Error from "../../Error";

const LoginInputs = () => {
  function initialState() {
    return { user: "", password: "" };
  }

  const [inputValues, setInputValues] = useState(initialState());
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

  const loginInputColumn = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    const newErrorValues = errorValues.map((error) => {
      let errorMessage;
      if (error.name === "user") errorMessage = "Email ou CPF inválido";
      if (error.name === "password") errorMessage = "Senha inválida";
      return {
        name: error.name,
        text: errorMessage,
      };
    });
    setErrorValues(newErrorValues);
  };

  const inputLoginPassword = document.querySelector("#input-login-password");
  const handleShowPasswordClick = () => {
    const newType = inputLoginPassword.getAttribute("type") === "password" ? "text" : "password";
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
      <Input
        type="button"
        className="proxbtt"
        onClick={handleButtonClick}
        value="Entrar"
      />
    </>
  );
};

export default LoginInputs;
