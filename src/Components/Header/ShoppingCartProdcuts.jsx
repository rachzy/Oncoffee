import React from "react";

import Product from "./Product";

const ShoppingCartProducts = ({
  cartProducts,
  handleSetPopupState,
  handleRemoveCartProduct
}) => {
  const handleButtonClick = () => {
    const popup = document.querySelector(".popup");
    const popupBox = document.querySelector(".popup-box");
    popup.classList.add("active");
    popupBox.classList.add("active");
    document.body.style.overflow = "hidden";
    handleSetPopupState("shoppingcart");
  };
  function returnCartProducts() {
    if (cartProducts) {
      if (cartProducts.length === 0) {
        return (
          <div className="shop_text_line" style={{ width: "100%" }}>
            <h3 style={{ textAlign: "center", fontSize: "17px" }}>
              Você ainda não adicionou nenhum produto ao carrinho...
            </h3>
          </div>
        );
      }
      return (
        <>
          <div className="shop_box_overflow">
            {cartProducts.map((p) => {
              if (!p) return;
              return (
                <Product
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
          <a className="default-btn" onClick={handleButtonClick}>Conferir Carrinho</a>
        </>
      );
    }
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
