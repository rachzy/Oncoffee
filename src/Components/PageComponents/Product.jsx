import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import displayError from "../../globalFunctions/displayErrors";

import HeartImg from "../../imgs/newhearth.png";
import favHeartImg from "../../imgs/favhearth.png";

import { GlobalServerContext, UserSession } from "../../App";

const Product = ({
  productId,
  productName,
  productDiscount,
  productImage,
  productFinalPrice,
  productDescription,
  productGrade,
  productTotalSales,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
  cartProducts,
  favoriteProducts,
  customStyle,
}) => {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const [favHeartIcon, defaultHeartIcon, shoppingCartIcon] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const { isLogged } = useContext(GlobalServerContext);

  useEffect(() => {
    if (isLoaded) {
      const checkIfProductIsOnUserShoppingCart = () => {
        const { classList } = shoppingCartIcon.current;

        const checkIfProductIsAlreadyOnCart = cartProducts.filter(
          (product) => product.productId === productId
        );

        if (checkIfProductIsAlreadyOnCart.length !== 0) {
          shoppingCartIcon.current.title = "Remover esse produto do carrinho";
          return classList.add("active");
        }

        if (!classList.contains("active")) return;
        shoppingCartIcon.current.title = "Adicionar esse produto do carrinho";
        classList.remove("active");
      };
      checkIfProductIsOnUserShoppingCart();

      //Simple function that will check if the product is already favorited by the user
      //and display a "favorited heart" icon instead of a default one if it is
      if (!isLogged) return;
      const checkIfProductIsFavorited = () => {
        let isProductSetAsFavorite = false;

        favoriteProducts.forEach((product) => {
          if (product.productId.toString() !== productId.toString()) return;
          return (isProductSetAsFavorite = true);
        });

        if (favHeartIcon.current === null || defaultHeartIcon.current === null)
          return;

        //If the product is already favorited, display a favorited heart instead of a default one
        if (isProductSetAsFavorite) {
          favHeartIcon.current.classList.add("active");
          defaultHeartIcon.current.classList.remove("active");
          return;
        }
        favHeartIcon.current.classList.remove("active");
        defaultHeartIcon.current.classList.add("active");
      };
      checkIfProductIsFavorited();
    }
  }, [
    cartProducts,
    defaultHeartIcon,
    favHeartIcon,
    favoriteProducts,
    isLoaded,
    isLogged,
    productId,
    shoppingCartIcon,
  ]);

  //Return a discount div if there's discount
  const returnDiscount = () => {
    if (!productDiscount) return;
    return (
      <div className="produto_desconto">
        <h3>{productDiscount}%</h3>
        <h3>OFF</h3>
      </div>
    );
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

    //Change the FavoriteedProducts state with the new value
    const addNewProductToFavoriteProductsState = async () => {
      //CLASS SECTION
      const DefaultHeartClassList = defaultHeartIcon.current.classList;
      const defaultHeartIconElements = document.querySelectorAll(
        `#productDefaultHeart${productId}`
      );
      const favHeartIconElements = document.querySelectorAll(
        `#productFavHeart${productId}`
      );

      let isProductSetAsFavorite = DefaultHeartClassList[1];

      const changeHeartIconClass = () => {
        if (isProductSetAsFavorite) {
          //Change the class of every single heart of products with that ID
          defaultHeartIconElements.forEach((element) => {
            element.classList.add("active");
          });
          favHeartIconElements.forEach((element) => {
            element.classList.remove("active");
          });
          return;
        }
        //Change the class of every single heart of products with that ID
        defaultHeartIconElements.forEach((element) => {
          element.classList.remove("active");
        });
        favHeartIconElements.forEach((element) => {
          element.classList.add("active");
        });
      };
      changeHeartIconClass();

      const queryFavoriteProduct = async () => {
        try {
          if (isProductSetAsFavorite) {
            const newProduct = {
              productId: productId,
              productTitle: productName,
              productDescription: productDescription,
              productImage: productImage,
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
    };
    addNewProductToFavoriteProductsState();
  };

  const handleBuyClick = () => {
    const getMainContentDiv = document.querySelector(".conteudo");
    getMainContentDiv.classList.remove("active");
    setTimeout(() => {
      navigate(`/product/${productId}`);
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleShoppingCartClick = async () => {
    const { classList } = shoppingCartIcon.current;

    if (!classList.contains("active")) {
      const newCartProduct = {
        productId: productId,
        productName: productName,
        productDescription: productDescription,
        productImgSrc: productImage,
        productImgAlt: productName,
        productFinalPrice: productFinalPrice,
      };
      return handleAddCartProduct(newCartProduct);
    }
    handleRemoveCartProduct(productId);
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
    <div
      onLoad={() => {
        setIsLoaded(true);
      }}
      className="produto_box"
      style={customStyle}
    >
      {returnDiscount()}
      <div className="produto_favorito">
        <input type="checkbox" id="favproduct" />
        <label htmlFor="favproduct">
          <img
            style={{ marginRight: "-25px" }}
            ref={favHeartIcon}
            onClick={handleHeartIconClick}
            src={favHeartImg}
            alt="fav-heart-icon"
            id={`productDefaultHeart${productId}`}
            title="Tirar esse produto dos favoritos"
            className="hearticon"
          />
          <img
            ref={defaultHeartIcon}
            onClick={handleHeartIconClick}
            src={HeartImg}
            alt="heart-icon"
            id={`productFavHeart${productId}`}
            title="Adicionar esse produto aos favoritos"
            className="hearticon active"
          />
        </label>
        <i
          ref={shoppingCartIcon}
          onClick={handleShoppingCartClick}
          title="Adicionar esse produto ao carrinho"
          className="fa-solid fa-cart-shopping"
        ></i>
      </div>
      <div className="produto_img">
        <img src={require(`../../imgs/${productImage}`)} alt={productName} />
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
