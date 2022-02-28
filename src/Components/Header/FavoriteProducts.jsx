import React from "react";

import Product from "./Product";

const FavoriteProducts = ({
  favoritedProducts,
  handleSetPopupState,
  handleFavoritedProductsChange,
}) => {
  const handleButtonClick = () => {
    const popup = document.querySelector(".popup");
    const popupBox = document.querySelector(".popup-box");
    popup.classList.add("active");
    popupBox.classList.add("active");
    document.body.style.overflow = "hidden";
    handleSetPopupState("favoritedproducts");
  };
  function returnFavoritedProducts() {
    if (favoritedProducts) {
      if (favoritedProducts.length === 0) {
        return (
          <div className="fav_text_line" style={{ width: "100%" }}>
            <h3 style={{ textAlign: "center", fontSize: "17px" }}>
              Você ainda não favoritou nenhum produto...
            </h3>
          </div>
        );
      }
      return (
        <>
          {favoritedProducts.map((p) => {
            if (!p) return;
            if (favoritedProducts.length > 5) {
              for (let i = 5; i <= favoritedProducts.length; i++) {
                if (p === favoritedProducts[i]) return;
              }
            }
            return (
              <Product
                key={p.productId}
                classPrefix="fav"
                productId={p.productId}
                productName={p.productName}
                productImgSrc={p.productImgSrc}
                productImgAlt={p.productImgAlt}
                productFinalPrice={p.productFinalPrice}
                handleFavoritedProductsChange={handleFavoritedProductsChange}
              />
            );
          })}
          <a className="default-btn" onClick={handleButtonClick}>Conferir Favoritos</a>
        </>
      );
    }
    return (
      <div className="fav_text_line" style={{ width: "100%" }}>
        <h3 style={{ textAlign: "center", fontSize: "17px" }}>
          Produtos favoritados aparecem aqui...
        </h3>
      </div>
    );
  }
  return <div className="fav_box">{returnFavoritedProducts()}</div>;
};

export default FavoriteProducts;
