import React from "react";
import { useNavigate } from "react-router-dom";

const ProductPopup = ({
  productId,
  productName,
  productImgSrc,
  productImgAlt,
  productFinalPrice,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/product/${productId}`);
    const popup = document.querySelector(".popup");
    popup.classList.remove("active");
    document.body.style.overflowY = 'visible';
  };

  const returnFinalPrice = () => {
    const splitFinalPrice = productFinalPrice.toString().split(".");
    let getProductFinalPrice = productFinalPrice;
    if (splitFinalPrice.length === 1) {
      getProductFinalPrice = `${productFinalPrice},00`;
    } else {
      if (splitFinalPrice[1].length === 1) {
        getProductFinalPrice = `${productFinalPrice}0`;
      }
    }
    const finalPriceWithCommas = getProductFinalPrice
      .toString()
      .replace(".", ",");
    return finalPriceWithCommas;
  };
  return (
    <div className="popup-product">
      <img src={require(`../../../imgs/${productImgSrc}`)} alt={productImgAlt} />
      <div className="popup-product-text">
        <h2>{productName}</h2>
        <h3>R$ {returnFinalPrice()}</h3>
      </div>
      <button onClick={handleButtonClick} className="popup-product-button">
        Ver
      </button>
    </div>
  );
};

export default ProductPopup;
