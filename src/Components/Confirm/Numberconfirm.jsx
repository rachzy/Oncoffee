import React from "react";

const Numberconfirm = ({mainClassName}) => {
  return (
    <main className={mainClassName}>
      <input type="button" name="" id="backbtt" />
      <label htmlFor="backbtt">
        <i className="fas fa-angle-left"></i>
      </label>
      <h2>Confirmação</h2>
      <p>
        Enviamos um SMS contendo o código de segurança de 6 dígitos para o
        numero seu número de telefone, digite o código abaixo para confirmar:
      </p>
      <input type="button" id="reenviar" />
      <label className="reenviar" htmlFor="reenviar">
        <p>Reenviar Código</p>
      </label>
      <div className="inputstext">
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
      <div className="bttcenter">
        <input type="button" value="Enviar" />
      </div>
    </main>
  );
};

export default Numberconfirm;
