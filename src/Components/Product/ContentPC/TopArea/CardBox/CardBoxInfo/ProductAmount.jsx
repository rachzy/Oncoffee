import React from "react";

const ProductAmount = ({amount, setAmount}) => {
    const increaseAmount = () => {
        setAmount((currentState) => currentState + 1);
      };
    
      const decreaseAmount = () => {
        if (amount <= 1) return;
        setAmount((currentState) => currentState - 1);
      };
  return (
    <div className="product_quant">
      <h2>Quantidade:</h2>

      <div className="quantity">
        <button
          onClick={decreaseAmount}
          className="minus-btn"
          type="button"
          name="button"
        >
          <img
            src="https://designmodo.com/demo/shopping-cart/minus.svg"
            alt=""
          />
        </button>
        <input type="text" name="name" value={amount} />

        <button
          onClick={increaseAmount}
          className="plus-btn"
          type="button"
          name="button"
        >
          <img
            src="https://designmodo.com/demo/shopping-cart/plus.svg"
            alt=""
          />
        </button>
      </div>

      <h3>9999 Itens disponíveis</h3>
    </div>
  );
};

export default ProductAmount;
