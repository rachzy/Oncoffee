import React, { useState } from "react";

import Input from "../../Input";
import Error from "../../Error";

const RegisterInputs = () => {
  function initialState() {
    return {
      name: "",
      lastname: "",
      email: "",
      confemail: "",
      password: "",
      confpassword: "",
    };
  }
  const [inputValues, setInputValues] = useState(initialState());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <>
      <Input
        name="name"
        placeholder="Nome"
        type="text"
        className="logmail"
        onChange={handleInputChange}
        value={inputValues.name}
      />
      <Error />

      <Input
        name="lastname"
        placeholder="Sobrenome"
        type="text"
        className="logmail"
        onChange={handleInputChange}
        value={inputValues.lastname}
      />
      <Error />

      <Input
        name="email"
        placeholder="Digite seu E-mail"
        type="text"
        className="logmail"
        onChange={handleInputChange}
        value={inputValues.email}
      />
      <Error />

      <Input
        name="confemail"
        placeholder="Confirmar E-mail"
        type="text"
        className="logmail"
        onChange={handleInputChange}
        value={inputValues.confemail}
      />
      <Error />

      <Input
        name="password"
        placeholder="Senha  ( 8 - 20 Caracteres)"
        type="text"
        className="logmail"
        onChange={handleInputChange}
        value={inputValues.password}
      />
      <Error />

      <Input
        name="conpassword"
        placeholder="Confirmar Senha"
        type="text"
        className="logmail"
        onChange={handleInputChange}
        value={inputValues.confpassword}
      />
      <Input type="button" value="Próximo" className="proxbtt" />
    </>
  );
};

export default RegisterInputs;
