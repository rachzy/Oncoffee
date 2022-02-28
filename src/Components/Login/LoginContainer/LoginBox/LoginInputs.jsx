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
      id: "user",
      text: "",
    },
    {
      id: "password",
      text: "",
    },
  ]);

  const loginInputColumn = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    const newErrorValues = errorValues.map((error) => {
      let errorMessage;
      if (error.id === "user") errorMessage = "Email ou CPF incorreto";
      if (error.id === "password") errorMessage = "Senha incorreta";
      return {
        id: error.id,
        text: errorMessage,
      };
    });
    setErrorValues(newErrorValues);
  };

  const inputLoginPassword = document.querySelector("#input-login-password");
  let showPassword = false;
  const handleShowPasswordClick = () => {
    
    if (showPassword) {
      inputLoginPassword.type = "text";
      return showPassword = true;
    }
    inputLoginPassword.type = "password";
    return showPassword = false;
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
          onChange={handleInputChange}
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
            onChange={handleInputChange}
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
        <Error id={errorValues[1].id} text={errorValues[1].text} />
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
