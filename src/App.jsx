import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/Content.css";

import Axios from "axios";

import displayError from "./globalFunctions/displayErrors";

import SkipToContentButton from "./Components/PageComponents/SkipToContentButton";
import Popup from "./Components/PageComponents/Popup";
import Header from "./Components/PageComponents/Header";
import Error from "./Components/PageComponents/Error";

import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Confirm from "./Pages/Confirm";
import Product from "./Pages/Product";

export const GlobalServerContext = createContext();
export const UserSession = createContext();

const App = () => {
  const { serverUrl } = require("./connection.json");

  //State that will save the current status of the connection with the server
  const [serverStatus, setServerStatus] = useState();
  const [isUserLoggedIn, setUserLoggedIn] = useState();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [userSessionState, setUserSessionState] = useState();

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/user/getfavoriteproducts`,
          { withCredentials: true }
        );

        if (data.isError) return displayError(data.errorCode, data.errno);

        setFavoriteProducts(data);
      } catch (err) {
        displayError(err, err.response.code);
      }
    };

    const validateSecurityTokens = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/account/validatetokens`,
          { withCredentials: true }
        );

        if (data.isError) return window.location.reload();

        if (data.queryStatus !== 200) return;

        const { isLoggedIn, userData } = data;
        setUserLoggedIn(isLoggedIn);
        setUserSessionState(userData);
      } catch (err) {
        displayError(err, err.code);
      }
    };

    const checkServerConnection = async () => {
      try {
        const { status } = await Axios.get(`${serverUrl}`);
        setServerStatus(status);

        if (status !== 200) return;
        validateSecurityTokens();
        fetchFavoriteProducts();
        clearInterval(checkConnectionInterval);
      } catch (err) {
        displayError(err.message, err.code);
      }
    };
    checkServerConnection();

    let checkConnectionInterval = setInterval(checkServerConnection, 5000);
  }, [serverUrl, serverStatus]);

  const handleFavoriteProductsChange = async (newProduct) => {
    if (!newProduct || !newProduct.productId) return;

    const changeFavoriteProductsState = () => {
      let productAlreadyFavorite = false;

      for (let i = 0; i <= favoriteProducts.length - 1; i++) {
        if (newProduct.productId === favoriteProducts[i].productId)
          productAlreadyFavorite = true;
      }

      if (productAlreadyFavorite) {
        const newfavoriteProducts = favoriteProducts.filter(
          (product) => product.productId !== newProduct.productId
        );
        setFavoriteProducts(newfavoriteProducts);
        return;
      }
      const newfavoriteProducts = [newProduct, ...favoriteProducts];
      setFavoriteProducts(newfavoriteProducts);
    };

    //Post the new product on the database
    const postNewFavoriteProduct = async () => {
      try {
        const { data } = await Axios.post(
          `${serverUrl}/user/postfavoriteproduct`,
          {
            productId: newProduct.productId,
          },
          { withCredentials: true }
        );

        if (!data.isError && data.queryStatus === 200) {
          changeFavoriteProductsState();
          return { successful: true };
        }

        displayError(
          "",
          "",
          "Um erro interno do servidor ocorreu ao tentar executar essa ação"
        );
        return { successful: false };
      } catch (err) {
        displayError(
          "",
          "",
          "Um erro interno do servidor ocorreu ao tentar executar essa ação"
        );
        return { successful: false };
      }
    };
    return postNewFavoriteProduct();
  };

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    let cartProductsSavedOnLocalStorage =
      window.localStorage.getItem("cartProducts");

    if (!cartProductsSavedOnLocalStorage || cartProducts === "undefined")
      return;

    const parseCartProducts = () => {
      return JSON.parse(cartProductsSavedOnLocalStorage);
    };
    parseCartProducts();

    if (!Array.isArray(parseCartProducts())) {
      cartProductsSavedOnLocalStorage = `[${cartProductsSavedOnLocalStorage}]`;
      parseCartProducts();
    }

    setCartProducts(parseCartProducts());
  }, []); //DON'T INCLUDE "cartProducts" HERE, IT BREAKS THE CODE FOR SOME REASON

  const handleAddCartProduct = (newProduct) => {
    if (!newProduct) return;
    if (cartProducts && cartProducts.length !== 0) {
      const checkIfProductIsAlreadyOnCart = cartProducts.filter(
        (product) => product.productId === newProduct.productId
      );
      if (checkIfProductIsAlreadyOnCart.length !== 0) return;

      const newCartProducts = [newProduct, ...cartProducts];
      setCartProducts(newCartProducts);

      localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
      return;
    }
    setCartProducts([newProduct]);
    localStorage.setItem("cartProducts", JSON.stringify(newProduct));
  };

  const handleRemoveCartProduct = async (removedProductId) => {
    if (!removedProductId) return;
    const newCartProducts = cartProducts.filter(
      (product) => product.productId !== removedProductId
    );

    setCartProducts(newCartProducts);
    localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));

    return { successful: true };
  };

  //State that will control the content of the popup component
  const [popupContent, setPopupContent] = useState();

  //Function responsible for changing the popup content according to the passed parameter
  //OPTIONS

  //Title: defines the title of the popup

  //Type: defines the type of the popup that will be readen by the program later

  //Products: defines the products that will show up. It needs to be an Array and the objects
  //need to have at least those options: {productId, productName, productImgSrc, productImgAlt, productFinaLPrice}

  //Button: creates a button under the "popup-scroll-box" div.
  //If setted as "false", the button won't exist and the div will take up all the empty space
  //Options: {title: 'The title of the button', href: 'The page the user will be redirected when the button gets triggered'}
  const handleSetPopupState = (popupType, productObject) => {
    //Remove the "disabled" class from every product
    const popupProductsDiv = document.querySelectorAll(".popup-product");
    popupProductsDiv.forEach((productDiv) => {
      productDiv.classList.remove("disabled");
      productDiv.style.display = "flex";
    });
    if (!popupType) return;

    let PopupContentArray;
    switch (popupType) {
      case "favoriteproducts":
        PopupContentArray = {
          title: "Seus favoritos",
          type: "favoriteproducts",
          products: favoriteProducts,
          button: false,
          removeProduct: async (product) => {
            return handleFavoriteProductsChange(product);
          },
        };
        break;
      case "shoppingcart":
        if (!cartProducts || cartProducts.length === 0) return;
        // const allProductsIds = cartProducts.map((product) => {
        //   if (!product || !product.productId) return;
        //   return `${product.productId}`;
        // });
        PopupContentArray = {
          title: "Seu Carrinho",
          type: "cartproducts",
          products: cartProducts,
          button: {
            title: "Fazer checkout",
          },
          removeProduct: async () => {
            return handleRemoveCartProduct();
          },
        };
        break;
      case "singleproduct":
        if (!productObject) return;
        PopupContentArray = {
          title: productObject.productName,
          type: "singleproduct",
          product: productObject,
          button: {
            title: "Comprar",
          },
          removeProduct: false,
        };
        break;
      default:
        break;
    }
    setPopupContent(PopupContentArray);
  };

  //State that controls the Header title
  const [headerPageTitle, setHeaderPageTitle] = useState();

  //State that controls if the user had already loaded the index page once to avoid unnecessary loading
  const [isIndexAlreadyLoaded, setIndexAlreadyLoaded] = useState(false);

  return (
    <Router>
      <GlobalServerContext.Provider
        value={{
          serverUrl: serverUrl,
          displayError: displayError,
          isLogged: isUserLoggedIn,
          setIsLogged: setUserLoggedIn,
          setUserSessionState: setUserSessionState,
        }}
      >
        <SkipToContentButton />
        <Popup popupContent={popupContent} />
        <UserSession.Provider value={userSessionState}>
          <Header
            serverStatus={serverStatus}
            cartProducts={cartProducts}
            favoritedProductsState={favoriteProducts}
            cartProductsState={cartProducts}
            handleSetPopupState={handleSetPopupState}
            handleRemoveCartProduct={handleRemoveCartProduct}
            handleFavoritedProductsChange={handleFavoriteProductsChange}
          >
            {headerPageTitle}
          </Header>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Index
                  pageTitle="Home"
                  setHeaderPageTitle={setHeaderPageTitle}
                  serverStatus={serverStatus}
                  isIndexAlreadyLoaded={isIndexAlreadyLoaded}
                  setIndexAlreadyLoaded={setIndexAlreadyLoaded}
                  handleFavoritedProductsChange={handleFavoriteProductsChange}
                  handleSetPopupState={handleSetPopupState}
                  handleAddCartProduct={handleAddCartProduct}
                  handleRemoveCartProduct={handleRemoveCartProduct}
                  cartProducts={cartProducts}
                />
              }
            />
            <Route
              path="/login"
              exact
              element={
                <Login
                  pageTitle="Login"
                  setHeaderPageTitle={setHeaderPageTitle}
                  setUserSessionState={setUserSessionState}
                />
              }
            />
            <Route
              path="/confirm"
              exact
              element={
                <Confirm
                  pageTitle="Confirmação"
                  setHeaderPageTitle={setHeaderPageTitle}
                />
              }
            />
            <Route
              path="/product"
              element={<Product setHeaderPageTitle={setHeaderPageTitle} />}
            />
          </Routes>
        </UserSession.Provider>
      </GlobalServerContext.Provider>
      <Error />
    </Router>
  );
};

export default App;
