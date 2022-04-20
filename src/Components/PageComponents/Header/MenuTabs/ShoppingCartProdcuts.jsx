import React from "react";

import TabProduct from "./TabProduct";

const ShoppingCartProducts = ({
  cartProducts,
  handleSetPopupState,
  handleRemoveCartProduct,
}) => {
  //Open the "Popup" when the main button get clicked
  const handleButtonClick = async () => {
    const [popup, popupBox] = [
      document.querySelector(".popup"),
      document.querySelector(".popup-box"),
    ];

    popup.classList.add("active");

    setTimeout(() => {
      popupBox.classList.add("active");
    }, 1);

    document.body.style.overflow = "hidden";
    handleSetPopupState("shoppingcart");
  };

  function returnCartProducts() {
    //If "CartProducts" is not undefined, that means that the user is at least logged in
    if (cartProducts) {
      //If the length of "CartProducts" is "0", that means that the user still didn't add any product to their cart
      if (cartProducts.length === 0) {
        return (
          <div className="shop_text_line" style={{ width: "100%" }}>
            <h3 style={{ textAlign: "center", fontSize: "17px" }}>
              Você ainda não adicionou nenhum produto ao carrinho...
            </h3>
          </div>
        );
      }

      //If its length is not "0", there are products to be loaded
      return (
        <>
          <div className="shop_box_overflow">
            {cartProducts.map((p) => {
              if (!p) return;
              return (
                <TabProduct
                  key={p.productId}
                  classPrefix="shop"
                  productId={p.productId}
                  productName={p.productName}
                  productImgSrc={p.productImgSrc}
                  productImgAlt={p.productImgAlt}
                  productFinalPrice={p.productFinalPrice}
                  handleRemoveCartProduct={handleRemoveCartProduct}
                />
              );
            })}
          </div>
          <a className="default-btn" onClick={handleButtonClick}>
            Conferir Carrinho
          </a>
        </>
      );
    }

    //If "CartProducts" is not defined, that means that the user is not even logged in
    return (
      <div className="shop_text_line" style={{ width: "100%" }}>
        <h3 style={{ textAlign: "center", fontSize: "17px" }}>
          Seu carrinho de compras aparece aqui...
        </h3>
      </div>
    );
  }

  return <div className="shop_box">{returnCartProducts()}</div>;
};

export default ShoppingCartProducts;
