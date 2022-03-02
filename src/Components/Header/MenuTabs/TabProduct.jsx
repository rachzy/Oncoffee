import React from "react";

const TabProduct = ({
  classPrefix,
  productId,
  productName,
  productImgSrc,
  productImgAlt,
  productFinalPrice,
  handleRemoveCartProduct,
  handleFavoritedProductsChange
}) => {
  //Return the price with ",00";
  const returnFinalPrice = () => {
    const splitFinalPrice = productFinalPrice.toString().split(".");
    let getproductFinalPrice = productFinalPrice;
    if (splitFinalPrice.length === 1) {
      getproductFinalPrice = `${productFinalPrice},00`;
    } else {
      if (splitFinalPrice[1].length === 1) {
        getproductFinalPrice = `${productFinalPrice}0`;
      }
    }
    const finalPriceWithCommas = getproductFinalPrice
      .toString()
      .replace(".", ",");
    return finalPriceWithCommas;
  };

  //Return the name with dots if its length is higher than 20 characters
  const returnNameWithDots = () => {
    const productNameLength = productName.length;
    if (productNameLength > 20) {
      const getProductNameFirstLetters = productName.slice(0, 20);
      return `${getProductNameFirstLetters}...`;
    }
    return productName;
  };

  const removeProduct = () => {
    //For "Cart" Tab
    if(handleRemoveCartProduct) {
      handleRemoveCartProduct(productId);
    }

    //For "Favorited Products" Tab
    if(handleFavoritedProductsChange) {
      const productCardHeartIcon = document.querySelector(`#productFavHeart${productId}`);
      if(productCardHeartIcon) return productCardHeartIcon.click();
      const productArray = {
        productId: productId
      }
      handleFavoritedProductsChange(productArray);
    }
  }

  function returnProductIfNotUndefined() {
    if (!productName) return;
    return (
      <div className={`${classPrefix}_product`}>
        <div className={`${classPrefix}_img_line`}>
          <img
            src={require(`../../../imgs/${productImgSrc}`)}
            alt={productImgAlt}
          />
        </div>
        <div className={`${classPrefix}_text_line`}>
          <h2>{returnNameWithDots()}</h2>
          <h3>R$ {returnFinalPrice()}</h3>
        </div>
        <div className={`${classPrefix}_remove_line`}>
          <button id={`removeProductBtn${classPrefix}${productId}`} onClick={removeProduct}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
  return <>{returnProductIfNotUndefined()}</>;
};

export default TabProduct;
