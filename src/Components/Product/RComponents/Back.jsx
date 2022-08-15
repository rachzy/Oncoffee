import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  const redirectBack = () => {
    navigate("/Oncoffee");
  };
  return (
    <div className="back">
      <button onClick={redirectBack}>
        <i className="fas fa-long-arrow-alt-left"></i> Voltar
      </button>
    </div>
  );
};

export default Back;
