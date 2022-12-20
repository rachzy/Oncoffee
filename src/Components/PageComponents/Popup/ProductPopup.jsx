import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalServerContext } from "../../../App";

const ProductPopup = ({
  popupType,
  productId,
  productName,
  productDescription,
  productImgSrc,
  productImgAlt,
  productFinalPrice,
  handleRemoveProduct,
  closePopupBox,
}) => {
  const productDiv = useRef(null);
  const navigate = useNavigate();
  const { displayError } = useContext(GlobalServerContext);

  const handleButtonClick = () => {
    navigate(`/product/${productId}`);
    closePopupBox();
  };

  //When the user clicks in the X Button in front of the product
  const handleXClick = async () => {
    if (!productDiv) return;
    productDiv.current.classList.add("disabled");

    try {
      const { successful } = await handleRemoveProduct(productId);

      if (!successful) {
        productDiv.current.classList.remove("disabled");
        setTimeout(() => {
          //When the animation is over, set the product display as none
          productDiv.current.style.display = "none";
        }, 300);
        return;
      }
    } catch (err) {
      displayError(err, err.code);
      return productDiv.current.classList.remove("disabled");
    }
  };

  //Return price with ",00" if necessary
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
    <div ref={productDiv} id={`${productId}`} className="popup-product">
      <img
        onClick={handleButtonClick}
        src={require(`../../../imgs/${productImgSrc}`)}
        alt={productImgAlt}
      />
      <div className="popup-product-text">
        <h2 onClick={handleButtonClick}>{productName}</h2>
        <p>{productDescription}</p>
        <h3>R$ {returnFinalPrice()}</h3>
      </div>
      <button
        onClick={handleButtonClick}
        className="default-btn"
        style={{ backgroundColor: "rgb(167, 89, 45)", height: "30px" }}
      >
        Ver
      </button>
      <button onClick={handleXClick} className="popup-remove-btn">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default ProductPopup;
