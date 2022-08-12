import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import FavHeartIcon from "../../../../../imgs/favhearth.png";
import HeartIcon from "../../../../../imgs/newhearth.png";

import { GlobalServerContext } from "../../../../../App";
import { useEffect } from "react";

const Product = ({
  productId,
  productName,
  productDescription,
  productImgSrc,
  productImgAlt,
  productFinalPrice,
  productDiscount,
  favoriteProducts,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
}) => {
  const favhearticon = useRef(null);
  const defaulthearticon = useRef(null);

  const { displayError, isLogged } = useContext(GlobalServerContext);

  useEffect(() => {
    if (!isLogged || !favoriteProducts) return;
    const checkIfProductIsFavorited = () => {
      let isProductSetAsFavorite = false;

      favoriteProducts.forEach((product) => {
        if (product.productId.toString() !== productId.toString()) return;
        return (isProductSetAsFavorite = true);
      });

      if (favhearticon.current === null || defaulthearticon.current === null)
        return;

      //If the product is already favorited, display a favorited heart instead of a default one
      if (isProductSetAsFavorite) {
        favhearticon.current.classList.add("active");
        defaulthearticon.current.classList.remove("active");
        return;
      }
      favhearticon.current.classList.remove("active");
      defaulthearticon.current.classList.add("active");
    };
    checkIfProductIsFavorited();
  }, [favoriteProducts, isLogged, productId]);

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
    if (!isLogged) {
      window.scrollTo(0, 0);
      return navigate("/login/");
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

    let isProductSetAsFavorite = defaulthearticon.current.classList[1];

    //Post the new product on the database
    const queryFavoriteProduct = async () => {
      try {
        if (isProductSetAsFavorite) {
          const newProduct = {
            productId: productId,
            productTitle: productName,
            productDescription: productDescription,
            productImage: productImgSrc,
            productPrice: { finalPrice: productFinalPrice },
          };
          const { successful } = await handleAddFavoriteProduct(newProduct);
          if (!successful) {
            changeHeartIconClass();
          }
          return;
        }

        const { successful } = await handleRemoveFavoriteProduct(productId);
        if (!successful) return changeHeartIconClass();
      } catch (err) {
        displayError(err, err.code);
        changeHeartIconClass();
      }
    };
    queryFavoriteProduct();

    //CLASS SECTION

    const DefaultHeartClassList = defaulthearticon.current.classList;
    const getOtherDefaultHeartIcons = document.querySelectorAll(
      `#productDefaultHeart${productId}`
    );
    const getOtherFavHeartIcons = document.querySelectorAll(
      `#productFavHeart${productId}`
    );

    const changeHeartIconClass = () => {
      if (DefaultHeartClassList[1] === "active") {
        getOtherDefaultHeartIcons.forEach((element) => {
          element.classList.add("active");
        });
        getOtherFavHeartIcons.forEach((element) => {
          element.classList.remove("active");
        });
      } else {
        getOtherDefaultHeartIcons.forEach((element) => {
          element.classList.remove("active");
        });
        getOtherFavHeartIcons.forEach((element) => {
          element.classList.add("active");
        });
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
          src={require(`../../../../../imgs/${productImgSrc}`)}
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
