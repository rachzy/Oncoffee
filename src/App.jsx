import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Axios from "axios";
import getCookie from "./globalFunctions/getCookie";
import deleteCookie from "./globalFunctions/deleteCookie";
import displayError from "./globalFunctions/displayErrors";

import "./css/App.css";
import "./css/Bottom.css";
import "./css/Cards.css";
import "./css/Mid.css";
import "./css/Mobile.css";
import "./css/Search.css";
import "./css/Top.css";

import SkipToContentButton from "./Components/SkipToContentButton";
import Popup from "./Components/Popup";
import Header from "./Components/Header";
import Buttonsmo from "./Components/ContentMobile/Buttonsmo";
import Content from "./Components/Content";
import Error from "./Components/Error";

const App = () => {
  const userId = getCookie("UID");
  const securityToken1 = getCookie("STOKEN1");
  const securityToken2 = getCookie("STOKEN2");

  const { serverUrl } = require("./connection.json");

  if (userId) {
    const getSecurityTokens = async () => {
      const { data } = await Axios.get(
        `${serverUrl}/verifysecuritytokens/${userId}/${securityToken1}/${securityToken2}`
      );

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
      );

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setFavoritedProducts(data);
    };
    fetchFavoritedProducts();
  }, [serverUrl]);

  //State that will control the content of the popup component
  const [popupContent, setPopupContent] = useState();

  //Function responsible for changing the popup content according to the passed parameter

  //OPTIONS

  //Title: defines the title of the popup

  //Products: defines the products that will show up. It needs to be an Array and the objects
  //need to have at least those options: {productId, productName, productImgSrc, productImgAlt, productFinaLPrice}
  
  //Button: creates a button under the "popup-scroll-box" div. 
  //If setted as "false", the button won't exist and the div will take up all the empty space
  //Options: {title: 'The title of the button', href: 'The page the user will be redirected when the button gets triggered'}
  const handleSetPopupState = (popupType) => {
    if (popupType === "favoritedproducts") {
      const PopupContentArray = {
        title: "Seus favoritos",
        products: favoritedProducts,
        button: {
          title: 'Example',
          href: '/checkout/productIds=12121212,12121212'
        }
      };
      setPopupContent(PopupContentArray);
    }
  };

  const handleFavoritedProductsChange = (newProduct) => {
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
    const newFavoritedProducts = [...favoritedProducts, newProduct];
    setFavoritedProducts(newFavoritedProducts);
  };

  return (
    <Router>
      <SkipToContentButton />
      <Popup popupContent={popupContent} />
      <Header favoritedProductsState={favoritedProducts} handleSetPopupState={handleSetPopupState} >Home</Header>
      <Buttonsmo />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Content
              handleFavoritedProductsChange={handleFavoritedProductsChange}
            />
          }
        />
      </Routes>
      <Error />
    </Router>
  );
};

export default App;
