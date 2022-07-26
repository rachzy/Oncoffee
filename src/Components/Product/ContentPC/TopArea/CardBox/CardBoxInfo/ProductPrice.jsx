import React from "react";

const ProductPrice = ({ productPrice }) => {
  const calculateInterest = () => {
    const calculateMonthlyPayment = Math.floor(
      ((productPrice.realPrice / productPrice.installments) *
        (100 + productPrice.interestRate)) /
        100
    );
    const roundFinalNumber = Math.round(calculateMonthlyPayment * 10) / 10;
    return roundFinalNumber.toFixed(2);
  };

  const returnInstallments = () => {
    if (productPrice.installments) {
      if (productPrice.interestRate) {
        return (
          <h5>
            Divido em até {productPrice.installments}x de R${" "}
            {calculateInterest()}
          </h5>
        );
      }
      return <h5>Divido em até {productPrice.installments}x sem juros</h5>;
    }
    return null;
  };

  return (
    <div className="product_price">
      <h3>R$ {productPrice.realPrice.toFixed(2)}</h3>
      <h2>R$ {productPrice.finalPrice.toFixed(2)}</h2>
      <h4>-${productPrice.discount}% OFF</h4>
      {returnInstallments()}
    </div>
  );
};

export default ProductPrice;
