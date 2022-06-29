import React from "react";

const ProductPrice = ({
  amount,
  setAmount,
  productPrice,
  productRemainingAmount,
}) => {
  const calculateDiscount = () => {
    const priceWithDiscount =
      (productPrice.realPrice * productPrice.discount) / 100;
    return priceWithDiscount.toFixed(2);
  };

  const increaseAmount = () => {
    if (amount >= productRemainingAmount) return;

    if (!amount) {
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

    if (!value) {
      return setAmount("");
    }

    if (isNaN(value) || value === "0") return;
    if (parseInt(value) > productRemainingAmount) return;

    setAmount(parseInt(value));
  };

  return (
    <div className="preco_area">
      <div className="preco">
        <div className="descontopreco">
          <h3>R$ {productPrice.realPrice.toFixed(2)}</h3>
          <h2>R$ {calculateDiscount()}</h2>
        </div>
        <h4>{productPrice.discount}%OFF</h4>
      </div>

      <div className="quant_mobile">
        <h2>Quantidade:</h2>

        <div className="quantity">
          <button
            className="minus-btn"
            type="button"
            name="button"
            onClick={decreaseAmount}
          >
            <img
              src="https://designmodo.com/demo/shopping-cart/minus.svg"
              alt=""
            />
          </button>
          <input
            type="text"
            name="name"
            value={amount}
            onChange={handleInputChange}
          />

          <button
            className="plus-btn"
            type="button"
            name="button"
            onClick={increaseAmount}
          >
            <img
              src="https://designmodo.com/demo/shopping-cart/plus.svg"
              alt=""
            />
          </button>
        </div>

        <h3>{productRemainingAmount} Itens disponíveis</h3>
      </div>
    </div>
  );
};

export default ProductPrice;
