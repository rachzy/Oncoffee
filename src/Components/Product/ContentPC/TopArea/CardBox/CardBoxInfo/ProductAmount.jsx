import React from "react";

const ProductAmount = ({ amount, setAmount, productRemainingAmount }) => {
  const increaseAmount = () => {
    if(amount >= productRemainingAmount) return;

    if(!amount) {
      return setAmount(1);
    }

    setAmount((currentState) => currentState + 1);
  };

  const decreaseAmount = () => {
    if (amount <= 1) return;
    setAmount((currentState) => currentState - 1);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    if(!value) {
      return setAmount("");
    }

    if (isNaN(value) || value === "0") return;
    if(parseInt(value) > productRemainingAmount) return;

    setAmount(parseInt(value));
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
            alt="add-product-icon"
          />
        </button>
        <input name="name" onChange={handleInputChange} value={amount} />

        <button
          onClick={increaseAmount}
          className="plus-btn"
          type="button"
          name="button"
        >
          <img
            src="https://designmodo.com/demo/shopping-cart/plus.svg"
            alt="remove-product-icon"
          />
        </button>
      </div>

      <h3>{productRemainingAmount} Itens disponíveis</h3>
    </div>
  );
};

export default ProductAmount;
