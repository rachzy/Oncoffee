import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import getCookie from "../../globalFunctions/getCookie";

const ProductPopup = ({
  popupType,
  productId,
  productName,
  productDescription,
  productImgSrc,
  productImgAlt,
  productFinalPrice,
  removeProduct,
  closePopupBox,
}) => {
  const productDiv = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/product/${productId}`);
    closePopupBox();
  };

  const handleXClick = async () => {
    const userId = getCookie("UID");
    if (!userId) return;

    let removeProductBtn;

    if (popupType === "cartproducts")
      removeProductBtn = document.querySelector(
        `#removeProductBtnshop${productId}`
      );
    if (popupType === "favoritedproducts")
      removeProductBtn = document.querySelector(
        `#removeProductBtnfav${productId}`
      );

    if (!removeProductBtn || removeProductBtn === null) {
      removeProduct({ productId });
    } else {
      removeProductBtn.click();
    }

    productDiv.current.classList.add("disabled");
    setTimeout(() => {
      productDiv.current.style.display = "none";
    }, 300);
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
    <div ref={productDiv} id={`${productId}`} className="popup-product">
      <img
        onClick={handleButtonClick}
        src={require(`../../imgs/${productImgSrc}`)}
        alt={productImgAlt}
      />
      <div className="popup-product-text">
        <h2 onClick={handleButtonClick}>{productName}</h2>
        <p>{productDescription}</p>
        <h3>R$ {returnFinalPrice()}</h3>
      </div>
      <button onClick={handleButtonClick} className="default-btn">
        Ver
      </button>
      <button onClick={handleXClick} className="popup-remove-btn">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default ProductPopup;
