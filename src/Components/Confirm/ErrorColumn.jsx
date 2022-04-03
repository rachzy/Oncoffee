import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorColumn = ({ mainClassName, message }) => {
  const navigate = useNavigate();
  return (
    <main className={mainClassName}>
      <h1>Ocorreu um erro</h1>
      <p>
        {message}
      </p>
      <button onClick={() => navigate('/')}>Voltar</button>
    </main>
  );
};

export default ErrorColumn;
