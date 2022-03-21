import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import getCookie from "../../../globalFunctions/getCookie";

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

  //When the user clicks in the X Button in front of the product
  const handleXClick = async () => {
    const userId = getCookie("UID");
    if (!userId) return;

    let removeProductBtn;

    //Check if there's a button of "Remove Favorite" (Default Heart Icon) for that product loaded in the page

    switch (popupType) {
      case "cartproducts":
        removeProductBtn = document.querySelector(
          `#removeProductBtnshop${productId}`
        );
        break;
      case "favoritedproducts":
        removeProductBtn = document.querySelector(
          `#removeProductBtnfav${productId}`
        );
        break;
      default:
        break;
    }
      
    if (!removeProductBtn || removeProductBtn === null) {
      removeProduct({ productId });
    } else {
      removeProductBtn.click();
    }

    //Add the class "disabled" to trigger the product "disappearing" transition
    productDiv.current.classList.add("disabled");
    setTimeout(() => {
      //When the animation is over, set the product display as none
      productDiv.current.style.display = "none";
    }, 300);
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