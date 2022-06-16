import React, { useState } from "react";

const ProductFreight = ({freightCost}) => {
  const [inputValue, setInputValue] = useState("");
  const [freightFinalValue, setFreightFinalValue] = useState(`R$ ${freightCost.toFixed(2)}`);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    if(!value) return;
    calculatePrice();
  };

  const calculatePrice = () => {
    setFreightFinalValue("Calculando...");
    setTimeout(() => {
        setFreightFinalValue(`R$ ${freightCost.toFixed(2)}`)
    }, 2000)
  }
  return (
    <div className="product_frete">
      <h2>Calcule o frete através do seu CEP</h2>
      <div className="input_frete">
        <input
          type="text"
          className="frete"
          placeholder="00000-000"
          onChange={handleInputChange}
          value={inputValue}
        />
      </div>
      <a href="https://buscacepinter.correios.com.br/app/endereco/index.php">
        Não sei o meu CEP
      </a>
      <h2>Valor do Frete: {freightFinalValue}</h2>
    </div>
  );
};

export default ProductFreight;
