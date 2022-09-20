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
import Footer from "./Components/PageComponents/Footer";
import Search from "./Pages/Search";

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
        displayError(err.message, err.code);
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

  //Set as product as favorite
  const handleAddFavoriteProduct = async (
    newProduct = {
      productId: "",
      productTitle: "",
      productDescription: "",
      productImage: "",
      productPrice: "",
    }
  ) => {
    const {
      productId,
      productTitle,
      productDescription,
      productImage,
      productPrice,
    } = newProduct;

    if (
      !productId ||
      !productTitle ||
      !productDescription ||
      !productImage ||
      !productPrice
    ) {
      throw Error("Missing params");
    }

    //Add the product into the state of Favorite Products
    const changeState = () => {
      setFavoriteProducts((oldArray) => [...oldArray, newProduct]);
    };

    //Query the new product to the database
    const postNewFavoriteProduct = async () => {
      try {
        const { data } = await Axios.post(
          `${serverUrl}/user/addfavoriteproduct`,
          {
            productId: newProduct.productId,
          },
          { withCredentials: true }
        );

        if (!data.isError && data.queryStatus === 200) {
          changeState();
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

  //Remove a product from favorite products by its ID
  const handleRemoveFavoriteProduct = async (removedProduct) => {
    let productId = removedProduct.productId || removedProduct;
    if (!productId) throw "Missing params";

    const changeState = async () => {
      setFavoriteProducts((oldArray) =>
        oldArray.filter(
          (product) => product.productId.toString() !== productId.toString()
        )
      );
      return { successful: true };
    };

    //Query the product to the database
    const deleteFavoriteProduct = async () => {
      try {
        const { data } = await Axios.delete(
          `${serverUrl}/user/removefavoriteproduct/${productId}`,
          { withCredentials: true }
        );

        if (!data.isError && data.queryStatus === 200) {
          return await changeState();
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
    return deleteFavoriteProduct();
  };

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    let cartProductsSavedOnLocalStorage =
      window.localStorage.getItem("cartProducts");

    if (!cartProductsSavedOnLocalStorage) return;

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
    if (!newProduct) return { successful: false };

    if (cartProducts && cartProducts.length !== 0) {
      const checkIfProductIsAlreadyOnCart = cartProducts.filter(
        (product) =>
          product.productId.toString() === newProduct.productId.toString()
      );

      if (checkIfProductIsAlreadyOnCart.length !== 0)
        return { successful: false };

      setCartProducts((oldArray) => [newProduct, ...oldArray]);

      const newCartProducts = [newProduct, ...cartProducts];
      localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
      return { successful: true };
    }
    setCartProducts([newProduct]);
    localStorage.setItem("cartProducts", JSON.stringify(newProduct));

    return { successful: true };
  };

  const handleRemoveCartProduct = async (removedProduct) => {
    if (!removedProduct) return { successful: false };

    let removedProductId = removedProduct.productId || removedProduct;

    const newCartProducts = cartProducts.filter(
      (product) => product.productId.toString() !== removedProductId.toString()
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

    let popupContentObject;
    switch (popupType) {
      case "favoriteproducts":
        popupContentObject = {
          title: "Seus favoritos",
          type: "favoriteproducts",
          products: favoriteProducts,
          button: false,
          removeProduct: async (productId, otherProducts) => {
            setPopupContent({
              ...popupContentObject,
              products: otherProducts,
            });
            return handleRemoveFavoriteProduct(productId);
          },
        };
        break;
      case "shoppingcart":
        if (!cartProducts || cartProducts.length === 0) return;
        // const allProductsIds = cartProducts.map((product) => {
        //   if (!product || !product.productId) return;
        //   return `${product.productId}`;
        // });
        popupContentObject = {
          title: "Seu Carrinho",
          type: "cartproducts",
          products: cartProducts,
          button: {
            title: "Fazer checkout",
          },
          removeProduct: async (removeProduct, otherProducts) => {
            setPopupContent({
              ...popupContentObject,

              products: otherProducts,
            });
            return handleRemoveCartProduct(removeProduct);
          },
        };
        break;
      case "singleproduct":
        if (!productObject) return;
        popupContentObject = {
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
    setPopupContent(popupContentObject);
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
            handleAddFavoriteProduct={handleAddFavoriteProduct}
            handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
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
                  handleAddFavoriteProduct={handleAddFavoriteProduct}
                  handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
                  handleSetPopupState={handleSetPopupState}
                  handleAddCartProduct={handleAddCartProduct}
                  handleRemoveCartProduct={handleRemoveCartProduct}
                  cartProducts={cartProducts}
                  favoriteProducts={favoriteProducts}
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
              path="/product/:productId"
              exact
              element={
                <Product
                  pageTitle="Produto"
                  setHeaderPageTitle={setHeaderPageTitle}
                  favoriteProducts={favoriteProducts}
                  handleAddFavoriteProduct={handleAddFavoriteProduct}
                  handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
                  cartProducts={cartProducts}
                  handleAddCartProduct={handleAddCartProduct}
                />
              }
            />
            <Route
              path="/search"
              exact
              element={<Search setHeaderPageTitle={setHeaderPageTitle} />}
            />
          </Routes>
        </UserSession.Provider>
      </GlobalServerContext.Provider>
      <Error />
    </Router>
  );
};

export default App;
