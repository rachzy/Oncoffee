import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Axios from 'axios';

import getCookie from "../../../../globalFunctions/getCookie";
import displayError from "../../../../globalFunctions/displayErrors";

import FavHeartIcon from "../../../../imgs/favhearth.png";
import HeartIcon from "../../../../imgs/newhearth.png";

const Product = ({
  productDiscount,
  productImgSrc,
  productImgAlt,
  productName,
  productFinalPrice,
  productId,
}) => {
  const userId = getCookie("UID");
  const favhearticon = useRef(null);
  const defaulthearticon = useRef(null);

  const {serverUrl} = require('../../../../connection.json');

  if(userId) {
    const checkIfProductIsFavorited = async() => {
      const { data } = await Axios.get(
        `${serverUrl}/getfavoriteproductsids/${userId}`
      );
      if(data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      const splitProductIds = data.split(',');
      splitProductIds.map(pId => {
        if(pId === productId.toString()) {
          favhearticon.current.classList.add("active");
          defaulthearticon.current.classList.remove("active");
        }
      })
    }
    checkIfProductIsFavorited();
  }
  const returnDiscount = () => {
    if (productDiscount) {
      return (
        <div className="desconto-area2">
          <h3>{productDiscount}%</h3>
          <h3>OFF</h3>
        </div>
      );
    }
  };
  const returnFinalPrice = () => {
    const splitFinalPrice = productFinalPrice.toString().split(".");
    let getProductFinalPrice = productFinalPrice;
    if (splitFinalPrice.length === 1) {
      getProductFinalPrice = productFinalPrice + ".00";
    }
    const finalPriceWithCommas = getProductFinalPrice
      .toString()
      .replace(".", ",");
    return finalPriceWithCommas;
  };
  let lastClick = 0;

  const handleHeartIconClick = (currentTime) => {
    if (!userId) {
      navigate("/login/");
      window.location.href = "#top";
      return;
    }
    const currentTimeTimeStamp = currentTime.timeStamp;
    const secondsSinceLastClick = Math.floor(
      (currentTimeTimeStamp - lastClick) / 1000
    );
    if (secondsSinceLastClick < 1) {
      displayError(
        "",
        "",
        "Espere pelo menos 2 segundos até a próxima interação!"
      );
      return;
    }
    const DefaultHeartClassList = defaulthearticon.current.classList;
    const defaultHeartIcon = document.querySelectorAll(
      `#productDefaultHeart${productId}`
    );
    const favHeartIcon = document.querySelectorAll(
      `#productFavHeart${productId}`
    );
    if (DefaultHeartClassList[1] === "active") {
      defaultHeartIcon.forEach((element) => {
        element.classList.add("active");
      });
      favHeartIcon.forEach((element) => {
        element.classList.remove("active");
      });
    } else {
      defaultHeartIcon.forEach((element) => {
        element.classList.remove("active");
      });
      favHeartIcon.forEach((element) => {
        element.classList.add("active");
      });
    }

    const postNewFavoriteProduct = async () => {
      const { data } = Axios.post(`${serverUrl}/postfavoriteproduct/`, {
        userId: userId,
        productId: productId,
      });
      if (!data) return;
      if (data.isError) {
        displayError(data.errorCode, data.errno);
      }
    };
    postNewFavoriteProduct();

    lastClick = currentTimeTimeStamp;
  };

  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${productId}`);
    window.location.href = "#top";
  };
  return (
    <div className="outros-card">
      {returnDiscount()}
      <div className="favbtt2">
        <input type="checkbox" name="" id="favbtt2" />
        <label htmlFor="favbtt2">
          <img
            style={{ marginRight: "-27px" }}
            ref={favhearticon}
            onClick={handleHeartIconClick}
            src={FavHeartIcon}
            alt="fav-heart-icon"
            id={`productDefaultHeart${productId}`}
            className="hearticon"
          />
          <img
            ref={defaulthearticon}
            onClick={handleHeartIconClick}
            src={HeartIcon}
            alt="heart-icon"
            id={`productFavHeart${productId}`}
            className="hearticon active"
          />
        </label>
      </div>
      <div className="cardmo-img2">
        <img
          src={require(`../../../../imgs/${productImgSrc}`)}
          alt={productImgAlt}
        />
      </div>
      <div className="cardmo-text2">
        <h2>{productName}</h2>

        <h3>R$ {returnFinalPrice()}</h3>
        <a onClick={handleProductClick}>Comprar</a>
      </div>
    </div>
  );
};

export default Product;
