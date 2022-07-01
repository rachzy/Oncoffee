import React, { useState } from "react";

const ProductFreight = ({ freightCost }) => {
  const [inputValue, setInputValue] = useState("");
  const [freightFinalValue, setFreightFinalValue] = useState(
    `R$ ${freightCost.toFixed(2)}`
  );

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    if (!value) return;
    calculatePrice();
  };

  const calculatePrice = () => {
    setFreightFinalValue("Calculando...");
    setTimeout(() => {
      setFreightFinalValue(`R$ ${freightCost.toFixed(2)}`);
    }, 2000);
  };
  return (
    <div className="calc_frete">
      <h2>Calcule o Frete</h2>
      <div className="frete_inputs">
        <input
          type="text"
          placeholder="00000-000"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button>Calcular</button>
      </div>
      <h3>Valor: {freightFinalValue}</h3>
    </div>
  );
};

export default ProductFreight;
