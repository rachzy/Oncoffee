import React from "react";

const Product = ({
  productImgSrc,
  productImgAlt,
  productName,
  productPrice,
}) => {
  const returnFinalPrice = () => {
    const splitFinalPrice = productPrice.toString().split(".");
    let getproductPrice = productPrice;
    if (splitFinalPrice.length === 1) {
      getproductPrice = `${productPrice},00`;
    } else {
        if(splitFinalPrice[1].length === 1) {
            getproductPrice = `${productPrice}0`;
        }
    }
    const finalPriceWithCommas = getproductPrice
      .toString()
      .replace(".", ",");
    return finalPriceWithCommas;
  };
  function returnProductIfNotUndefined() {
    if (!productName) return;
    return (
      <div className="shop_product">
        <img src={require(`../../imgs/${productImgSrc}`)} alt={productImgAlt} />
        <div className="fav_product_text">
          <h2>{productName}</h2>
          <h3>R$ {returnFinalPrice()}</h3>
        </div>
      </div>
    );
  }
  return <>{returnProductIfNotUndefined()}</>;
};

export default Product;
