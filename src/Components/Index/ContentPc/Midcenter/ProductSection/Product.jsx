import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import displayError from "../../../../.././globalFunctions/displayErrors";

import HeartIcon from "../../../../../imgs/newhearth.png";
import FavHeartIcon from "../../../../../imgs/favhearth.png";
import getCookie from "../../../../../globalFunctions/getCookie";

const Product = ({
  productId,
  productName,
  productDiscount,
  productImgSrc,
  productImgAlt,
  productFinalPrice,
  productDescription,
  productGrade,
  productTotalSales,
  setFavoriteProductsIds,
  favoritedProductsIds,
  handleAddCartProduct,
  handleFavoritedProductsChange,
  handleSetPopupState,
}) => {
  const userId = getCookie("UID");
  const favhearticon = useRef(null);
  const defaulthearticon = useRef(null);

  if (userId) {
    //Simple function that will check if the product is already favorited by the user
    //and display a "favorited heart" icon instead of a default one if it is
    const checkIfProductIsFavorited = async () => {
      if (!favoritedProductsIds) return;
      //Each value of this Array corresponds to a single productId
      const splitProductIds = favoritedProductsIds.toString().split(",");

      //If "splitProductIds" is not null, that means that there are more than one product
      if (splitProductIds) {
        splitProductIds.forEach((pId) => {
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
        <div className="produto_desconto">
          <h3>{productDiscount}%</h3>
          <h3>OFF</h3>
        </div>
      );
    }
  };

  const returnDescriptionWithDots = (lengthType) => {
    if (lengthType === "short") {
      if (productDescription.length > 70)
        return `${productDescription.slice(0, 70)}...`;
      return productDescription;
    }
    if (lengthType === "long") {
      if (productDescription.length > 300)
        return `${productDescription.slice(0, 300)}...`;
      return productDescription;
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
      window.scrollTo(0, 0);
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

    //Change the FavoriteedProducts state with the new value
    const addNewProductToFavoriteProductsState = async () => {
      const newProduct = {
        productId: productId,
        productName: productName,
        productDescription: productDescription,
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
  const handleBuyClick = () => {
    // navigate(`/product/${productId}`);
    // window.scrollTo(0, 0);
    const newCartProduct = {
      productId: productId,
      productName: productName,
      productDescription: productDescription,
      productImgSrc: productImgSrc,
      productImgAlt: productImgAlt,
      productFinalPrice: productFinalPrice,
    };
    handleAddCartProduct(newCartProduct);
  };

  //Function that would be triggered when the user clicked on "read more", but it's not being
  //Used for marketing reasons
  // const handleReadMoreClick = () => {
  //   const PopupProduct = {
  //     productId: productId,
  //     productName: productName,
  //     productDescription: returnDescriptionWithDots("long"),
  //     productImgSrc: productImgSrc,
  //     productImgAlt: productImgAlt,
  //     productFinalPrice: returnFinalPrice(),
  //   };
  //   handleSetPopupState("singleproduct", PopupProduct);
  //   const popup = document.querySelector(".popup");
  //   const popupBox = document.querySelector(".popup-box");
  //   popup.classList.add("active");
  //   popupBox.classList.add("active");
  //   document.body.style.overflow = "hidden";
  // };
  return (
    <div className="produto_box">
      {returnDiscount()}
      <div className="produto_favorito">
        <input type="checkbox" id="favproduct" />
        <label htmlFor="favproduct">
          <img
            style={{ marginRight: "-25px" }}
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
      <div className="produto_img">
        <img
          src={require(`../../../../../imgs/${productImgSrc}`)}
          alt={productImgAlt}
        />
      </div>
      <div className="produto_text1">
        <h2 className="nome">{productName}</h2>
        <h3 className="preco">R$ {returnFinalPrice()}</h3>
      </div>
      <div className="produto_text2">
        <p>
          {returnDescriptionWithDots("short")}
          <a className="readmore" onClick={handleBuyClick}>
            Ler Mais...
          </a>
        </p>
        <div className="avaliacao">
          <div className="nota">
            <i className="far fa-star"></i>
            <p>{productGrade}</p>
          </div>
          <div className="quant_venda">
            <p>{productTotalSales} Vendidos</p>
          </div>
        </div>
      </div>

      <a onClick={handleBuyClick} className="comprar">
        Comprar
      </a>
    </div>
  );
};

export default Product;