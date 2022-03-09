import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

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
  setFavoriteProductsIds,
  favoritedProductsIds,
  handleFavoritedProductsChange,
}) => {
  const userId = getCookie("UID");
  const favhearticon = useRef(null);
  const defaulthearticon = useRef(null);

  const { serverUrl } = require("../../../../connection.json");

  if (userId) {
    //Simple function that will check if the product is already favorited by the user
    //and display a "favorited heart" icon instead of a default one if it is
    const checkIfProductIsFavorited = async () => {
      if (!favoritedProductsIds) return;
      //Each value of this Array corresponds to a single productId
      const splitProductIds = favoritedProductsIds.toString().split(",");

      //If "splitProductIds" is not null, that means that there are more than one product
      if (splitProductIds) {
        splitProductIds.map((pId) => {
          if (!pId || pId === null || pId === "") return;
          if (pId === productId.toString()) {
            if (
              favhearticon.current === null ||
              defaulthearticon.current === null
            )
              return;
            //If the product is already favorited, display a favorited heart instead of a default one
            favhearticon.current.classList.add("active");
            defaulthearticon.current.classList.remove("active");
          }
        });
        return;
      }

      //If the program did not return, that means that there's just a single product (that will correspond to "data" value)
      if (favoritedProductsIds === productId.toString()) {
        //If the product is already favorited, display a favorited heart instead of a default one
        favhearticon.current.classList.add("active");
        defaulthearticon.current.classList.remove("active");
      }
    };
    //Execute the function after 500ms to avoid loading problems
    setTimeout(checkIfProductIsFavorited, 500);
  }

  //Return a discount div if there's discount
  const returnDiscount = () => {
    if (productDiscount) {
      return (
        <div className="desconto-area">
          <h3>{productDiscount}%</h3>
          <h3>OFF</h3>
        </div>
      );
    }
  };

  //Return ",00" on product price
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

  let lastClick = 0;

  const handleHeartIconClick = (currentTime) => {
    //Redirect the user to login page if he's not logged in
    if (!userId) {
      navigate("/login/");
      window.location.href = "#top";
      return;
    }

    //LOGIC SECTION

    //Cooldown the function
    //If the user have clicked in the same favorite button twice in an interval that is less
    //than 2 seconds of difference, stops the execution and display an error
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
    lastClick = currentTimeTimeStamp;

    //Pos the new product on the database
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

    //Change the FavoriteedProducts state with the new value
    const addNewProductToFavoriteProductsState = async () => {
      const newProduct = {
        productId: productId,
        productName: productName,
        productImgSrc: productImgSrc,
        productImgAlt: productImgAlt,
        productFinalPrice: productFinalPrice,
      };
      handleFavoritedProductsChange(newProduct);
    };
    addNewProductToFavoriteProductsState();

    //CLASS SECTION

    const DefaultHeartClassList = defaulthearticon.current.classList;
    const defaultHeartIcon = document.querySelectorAll(
      `#productDefaultHeart${productId}`
    );
    const favHeartIcon = document.querySelectorAll(
      `#productFavHeart${productId}`
    );

    const changeHeartIconClass = () => {
      if (DefaultHeartClassList[1] === "active") {
        defaultHeartIcon.forEach((element) => {
          element.classList.add("active");
        });
        favHeartIcon.forEach((element) => {
          element.classList.remove("active");
        });
        const newFavoritedProductsIds = `${favoritedProductsIds},${productId}`;
        setFavoriteProductsIds(newFavoritedProductsIds);
      } else {
        defaultHeartIcon.forEach((element) => {
          element.classList.remove("active");
        });
        favHeartIcon.forEach((element) => {
          element.classList.add("active");
        });
        const newFavoritedProductsIds = favoritedProductsIds.replace(
          `${productId}`,
          ""
        );
        setFavoriteProductsIds(newFavoritedProductsIds);
      }
    };
    changeHeartIconClass();
  };

  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="card-mobile">
      {returnDiscount()}
      <div className="favbtt">
        <input type="checkbox" name="" id="favbtt" />
        <label htmlFor="favbtt">
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
      <div className="cardmo-img">
        <img
          src={require(`../../../../imgs/${productImgSrc}`)}
          alt={productImgAlt}
        />
      </div>
      <div className="cardmo-text">
        <h2>{productName}</h2>

        <h3>R$ {returnFinalPrice()}</h3>
        <a onClick={handleProductClick}>Comprar</a>
      </div>
    </div>
  );
};

export default Product;
