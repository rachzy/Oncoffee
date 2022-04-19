import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/Content.css";

import Axios from "axios";

import displayError from "./globalFunctions/displayErrors";

import SkipToContentButton from "./Components/PageComponents/SkipToContentButton";
import Popup from "./Components/PageComponents/Popup";
import Header from "./Components/PageComponents/Header";
import Index from "./Components/Index";
import Error from "./Components/PageComponents/Error";

import Login from "./Components/Login";
import Confirm from "./Components/Confirm";

export const GlobalServerContext = createContext();

const App = () => {
  const { serverUrl } = require("./connection.json");

  //State that will save the current status of the connection with the server
  const [serverStatus, setServerStatus] = useState();
  const [favoritedProducts, setFavoritedProducts] = useState([]);

  useEffect(() => {
    const fetchFavoritedProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/user/getfavoriteproducts`
        );

        if (data.isError) return displayError(data.errorCode, data.errno);

        setFavoritedProducts(data);
      } catch (err) {
        displayError(err, err.response.code);
      }
    };

    const checkServerConnection = async () => {
      try {
        const { status } = await Axios.get(`${serverUrl}`);
        setServerStatus(status);

        if(status !== 200) return;
        fetchFavoritedProducts();
        clearInterval(checkConnectionInterval);
      } catch (err) {
        displayError(err.message);
      }
    };
    checkServerConnection();

    let checkConnectionInterval = setInterval(checkServerConnection, 5000);
  }, [serverUrl, serverStatus]);

  // const validateSecurityTokens = async () => {
  //   try {
  //     const { data } = await Axios.get(`${serverUrl}/account/validatetokens`);

  //     if (data.isError) window.location.reload();
  //   } catch (err) {
  //     displayError(err, err.response.code);
  //   }
  // };

  const handleFavoritedProductsChange = (newProduct) => {
    if (!newProduct || !newProduct.productId) return;

    //Post the new product on the database
    const postNewFavoriteProduct = async () => {
      try {
        const { data } = Axios.post(`${serverUrl}/user/postfavoriteproduct`, {
          productId: newProduct.productId,
        });

        if (!data) return;
        if (data.isError) {
          displayError(data.errorCode, data.errno);
        }
      } catch (err) {
        displayError(err, err.response.code);
      }
    };
    postNewFavoriteProduct();

    let productAlreadyFavorited = false;

    for (let i = 0; i <= favoritedProducts.length - 1; i++) {
      if (newProduct.productId === favoritedProducts[i].productId)
        productAlreadyFavorited = true;
    }

    if (productAlreadyFavorited) {
      const newFavoritedProducts = favoritedProducts.filter(
        (product) => product.productId !== newProduct.productId
      );
      setFavoritedProducts(newFavoritedProducts);
      return;
    }
    const newFavoritedProducts = [newProduct, ...favoritedProducts];
    setFavoritedProducts(newFavoritedProducts);
  };

  const [cartProducts, setCartProducts] = useState();

  useEffect(() => {
    let cartProductsSavedOnLocalStorage =
      window.localStorage.getItem("cartProducts");

    if (!cartProductsSavedOnLocalStorage || cartProducts === "undefined")
      return;

    const parseCartProducts = () => {
      return JSON.parse(
        cartProductsSavedOnLocalStorage
      );
    }
    parseCartProducts();

    if (!Array.isArray(parseCartProducts())) {
      cartProductsSavedOnLocalStorage = `[${cartProductsSavedOnLocalStorage}]`;
      parseCartProducts();
    }

    setCartProducts(parseCartProducts());
  }, []);

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

    switch (popupType) {
      case "favoritedproducts":
        let PopupContentObject = {
          title: "Seus favoritos",
          type: "favoritedproducts",
          products: favoritedProducts,
          button: false,
          removeProduct: function (productId) {
            handleFavoritedProductsChange(productId);
          },
        };
        setPopupContent(PopupContentObject);
        break;
      case "shoppingcart":
        if (!cartProducts || cartProducts.length === 0) return;
        // const allProductsIds = cartProducts.map((product) => {
        //   if (!product || !product.productId) return;
        //   return `${product.productId}`;
        // });
        PopupContentObject = {
          title: "Seu Carrinho",
          type: "cartproducts",
          products: cartProducts,
          button: {
            title: "Fazer checkout",
          },
          removeProduct: function () {
            handleRemoveCartProduct();
          },
        };
        setPopupContent(PopupContentObject);
        break;
      case "singleproduct":
        if (!productObject) return;
        PopupContentObject = {
          title: productObject.productName,
          type: "singleproduct",
          product: productObject,
          button: {
            title: "Comprar",
          },
          removeProduct: false,
        };
        setPopupContent(PopupContentObject);
        break;
      default:
        break;
    }
  };

  //State that controls the Header title
  const [headerPageTitle, setHeaderPageTitle] = useState();

  //State that controls if the user had already loaded the index page once to avoid unnecessary loading
  const [isIndexAlreadyLoaded, setIndexAlreadyLoaded] = useState(false);

  return (
    <Router>
      <SkipToContentButton />
      <Popup popupContent={popupContent} />
      <Header
        serverStatus={serverStatus}
        cartProducts={cartProducts}
        favoritedProductsState={favoritedProducts}
        cartProductsState={cartProducts}
        handleSetPopupState={handleSetPopupState}
        handleRemoveCartProduct={handleRemoveCartProduct}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
      >
        {headerPageTitle}
      </Header>
      <GlobalServerContext.Provider
        value={{ serverUrl: serverUrl, displayError: displayError }}
      >
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
                handleFavoritedProductsChange={handleFavoritedProductsChange}
                handleSetPopupState={handleSetPopupState}
                handleAddCartProduct={handleAddCartProduct}
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
        </Routes>
      </GlobalServerContext.Provider>
      <Error />
    </Router>
  );
};

export default App;
