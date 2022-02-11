import React, { useState, useEffect, useRef, useCallback } from "react";

import getCookie from "../../globalFunctions/getCookie";
import displayError from "../../globalFunctions/displayErrors";
import Axios from "axios";

import Product from "./Product";

const FavoriteProducts = ({favoritedProducts}) => {
  function returnFavoritedProducts() {
    if (favoritedProducts) {
      if (favoritedProducts.length === 0) {
        return (
          <div className="fav_product_text">
            <h3 style={{ textAlign: "center" }}>
              Você ainda não favoritou nenhum produto...
            </h3>
          </div>
        );
      }
      return (
        <>
          {favoritedProducts.map((p) => {
            if (!p) return;
            if(favoritedProducts.length > 6) {
              for(let i = 6; i <= favoritedProducts.length; i++) {
                if(p === favoritedProducts[i]) return;
              }
            }
            return (
              <Product
                key={p.productId}
                productName={p.productName}
                productImgSrc={p.productImgSrc}
                productImgAlt={p.productImgAlt}
                productPrice={p.productFinalPrice}
              />
            );
          })}
          <a>Conferir Favoritos</a>
        </>
      );
    }
    return (
      <div className="fav_product_text">
        <h3 style={{ textAlign: "center" }}>
          Produtos favoritados aparecem aqui...
        </h3>
      </div>
    );
  }
  return <div className="fav_box">{returnFavoritedProducts()}</div>;
};

export default FavoriteProducts;
