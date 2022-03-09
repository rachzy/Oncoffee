import React from "react";

import Input from "../../Input";
import Error from "../../Error";

const RegisterInputs = () => {
  return (
    <>
      <Input placeholder="Nome" type="text" className="logmail" />
      <Error />

      <Input placeholder="Sobrenome" type="text" className="logmail" />
      <Error />

      <Input placeholder="Digite seu E-mail" type="text" className="logmail" />
      <Error />

      <Input placeholder="Confirmar E-mail" type="text" className="logmail" />
      <Error />

      <Input
        placeholder="Senha  ( 8 - 20 Caracteres)"
        type="text"
        className="logmail"
      />
      <Error />
      
      <Input placeholder="Confirmar Senha" type="text" className="logmail" />
      <Input type="button" value="Próximo" className="proxbtt" />
    </>
  );
};

export default RegisterInputs;
