import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/Content.css";

import Axios from "axios";

import getCookie from "./globalFunctions/getCookie";
import deleteCookie from "./globalFunctions/deleteCookie";
import displayError from "./globalFunctions/displayErrors";

import SkipToContentButton from "./Components/PageComponents/SkipToContentButton";
import Popup from "./Components/PageComponents/Popup";
import Header from "./Components/PageComponents/Header";
import Index from "./Components/Index";
import Error from "./Components/PageComponents/Error";

import Login from "./Components/Login";

const App = () => {
  const userId = getCookie("UID");
  const securityToken1 = getCookie("STOKEN1");
  const securityToken2 = getCookie("STOKEN2");

  const { serverUrl } = require("./connection.json");

  //State that will save the current status of the connection with the server
  const [serverStatus, setServerStatus] = useState();

  useEffect(() => {
    const checkServerConnection = async () => {
      //The main page of the server will always return a status
      const checkServerConnection = await Axios.get(`${serverUrl}`).catch(
        () => {
          return displayError("0", "ERR_CONNECTION_REFUSED");
        }
      );

      if (!checkServerConnection) return;
      const { status } = checkServerConnection;

      //If the status received was "200" (that means OK)
      if (status === 200) {
        //Set the state with the status
        setServerStatus(status);
        //Stop the function of being executed, since the connection was already made
        clearInterval(refreshConnection);
      }
    };
    checkServerConnection();

    //Execute the function every 5 seconds
    var refreshConnection = setInterval(checkServerConnection, 5000);
  }, [serverUrl]);

  if (userId && serverStatus === 200) {
    //If there are no security tokens, stop the execution, delete the cookies and reload the page
    if(!securityToken1 || !securityToken2) {
      deleteCookie("UID");
      deleteCookie("STOKEN1");
      deleteCookie("STOKEN2");
      window.location.reload();
    }
    //Check if the security tokens cookies are valid, if they're not, unset all of them and reload the page
    const getSecurityTokens = async () => {
      const { data } = await Axios.get(
        `${serverUrl}/verifysecuritytokens/${userId}/${securityToken1}/${securityToken2}`
      ).catch(() => {
        return displayError("0", "SERVER_CONN_FAILED");
      });

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }

      if (!data || data.length === 0) {
        deleteCookie("UID");
        deleteCookie("STOKEN1");
        deleteCookie("STOKEN2");
        window.location.reload();
      } else {
        document.cookie = `UID=${data[0].accountId};secure`;
        document.cookie = `STOKEN1=${data[0].accountSecurityToken1};secure`;
        document.cookie = `STOKEN2=${data[0].accountSecurityToken2};secure`;
      }
    };
    getSecurityTokens();
  }

  const [favoritedProducts, setFavoritedProducts] = useState([]);
  useEffect(() => {
    const fetchFavoritedProducts = async () => {
      const userId = getCookie("UID");
      if (!userId) return;

      const { data } = await Axios.get(
        `${serverUrl}/getfavoriteproducts/${userId}`
      ).catch(() => {
        return displayError("0", "SERVER_CONN_FAILED");
      });

      if (data) clearInterval(refreshFunctionAndCheckServerStatus);

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setFavoritedProducts(data);
    };
    fetchFavoritedProducts();
    var refreshFunctionAndCheckServerStatus = setInterval(function () {
      fetchFavoritedProducts();
    }, 1000);
  }, [serverUrl]);

  const handleFavoritedProductsChange = (newProduct) => {
    if (!newProduct || !newProduct.productId || !userId) return;

    //Post the new product on the database
    const postNewFavoriteProduct = async () => {
      const { data } = Axios.post(`${serverUrl}/postfavoriteproduct/`, {
        userId: userId,
        productId: newProduct.productId,
      });
      if (!data) return;
      if (data.isError) {
        displayError(data.errorCode, data.errno);
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
    cartProductsSavedOnLocalStorage = JSON.parse(
      cartProductsSavedOnLocalStorage
    );
    setCartProducts(cartProductsSavedOnLocalStorage);
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

    if (popupType === "favoritedproducts") {
      const PopupContentObject = {
        title: "Seus favoritos",
        type: "favoritedproducts",
        products: favoritedProducts,
        button: false,
        removeProduct: function (productId) {
          handleFavoritedProductsChange(productId);
        },
      };
      setPopupContent(PopupContentObject);
    }

    if (popupType === "shoppingcart") {
      if (!cartProducts || cartProducts.length === 0) return;
      const allProductsIds = cartProducts.map((product) => {
        if (!product || !product.productId) return;
        return `${product.productId}`;
      });
      const PopupContentObject = {
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
    }

    if (popupType === "singleproduct") {
      if (!productObject) return;
      const PopupContentObject = {
        title: productObject.productName,
        type: "singleproduct",
        product: productObject,
        button: {
          title: "Comprar",
        },
        removeProduct: false,
      };
      setPopupContent(PopupContentObject);
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
            <Login pageTitle="Login" setHeaderPageTitle={setHeaderPageTitle} />
          }
        />
      </Routes>
      <Error />
    </Router>
  );
};

export default App;
