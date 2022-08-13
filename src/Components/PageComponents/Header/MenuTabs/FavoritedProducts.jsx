import React from "react";

import TabProduct from "./TabProduct";

const FavoritedProducts = ({
  favoritedProducts,
  handleSetPopupState,
  handleRemoveFavoriteProduct,
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
    handleSetPopupState("favoriteproducts");
  };

  function returnFavoritedProducts() {
    //If "FavoritedProducts" is not undefined, that means that the user is at least logged in
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
            if (!p) return null;
            if (favoritedProducts.length > 5) {
              for (let i = 5; i <= favoritedProducts.length; i++) {
                if (p === favoritedProducts[i]) return null;
              }
            }
            return (
              <TabProduct
                key={p.productId}
                classPrefix="fav"
                productId={p.productId}
                productName={p.productTitle}
                productImgSrc={p.productImage}
                productImgAlt={p.productTitle}
                productFinalPrice={p.productPrice.finalPrice}
                handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
              />
            );
          })}
          <a className="default-btn" onClick={handleButtonClick}>
            Conferir Favoritos
          </a>
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

export default FavoritedProducts;
