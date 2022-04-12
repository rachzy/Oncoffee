import React from "react";

import { useNavigate } from "react-router-dom";

const TopPromoProduct = ({
  imgSrc,
  imgAlt,
  productName,
  productPrice,
  productFinalPrice,
  productId,
}) => {
  const returnFinalPrice = (priceValue) => {
    const splitFinalPrice = priceValue.toString().split(".");
    let getProductFinalPrice = priceValue;
    if (splitFinalPrice.length === 1) {
      getProductFinalPrice = priceValue + ".00";
    }
    const finalPriceWithCommas = getProductFinalPrice
      .toString()
      .replace(".", ",");
    return finalPriceWithCommas;
  };
  const returnName = () => {
    let finalProductName = productName;
    const productNameLength = productName.length;
    if (productNameLength > 9) {
      const productNameWithDots = productName.slice(0, 9) + "...";
      finalProductName = productNameWithDots;
    }
    return finalProductName;
  };
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${productId}`);
    window.location.href = "#top";
  };
  return (
    <div className="toppromo-box">
      <div className="toppromo-img">
        <img src={require(`../../../../../imgs/${imgSrc}`)} alt={imgAlt} />
      </div>
      <div className="toppromo-text">
        <h2>{returnName()}</h2>
        <h3>R$ {returnFinalPrice(productPrice)}</h3>
        <h4>R$ {returnFinalPrice(productFinalPrice)}</h4>
        <a onClick={handleProductClick}>Comprar</a>
      </div>
    </div>
  );
};

export default TopPromoProduct;
