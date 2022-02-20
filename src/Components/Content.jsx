import React, { useState, useEffect } from "react";

import Axios from "axios";

import getCookie from "../globalFunctions/getCookie";
import displayError from "../globalFunctions/displayErrors";

import ContentPc from "./ContentPc";
import TopBar from "./ContentPc/TopBar";
import SliderMainPc from "./ContentPc/SliderMainPc";
import Midcenter from "./ContentPc/Midcenter";

import ContentMobile from "./ContentMobile";
import SliderMobile from "./ContentMobile/SliderMobile";
import MidcenterMobile from "./ContentMobile/MidcenterMobile";

const Content = ({
  handleAddCartProduct,
  handleFavoritedProductsChange,
  handleSetPopupState,
  serverStatus,
}) => {
  const userId = getCookie("UID");
  const [slideProductsIds, setSlideProductsIds] = useState([]);
  const [favoritedProductsIds, setFavoritedProductsIds] = useState();

  const { serverUrl } = require("../connection.json");

  //Get all favorited products ids
  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await Axios.get(
        `${serverUrl}/getslides/featuredpromotions`
      );

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }

      setSlideProductsIds(data);
    };
    fetchSlides();

    const fetchFavoritedProductsIds = async () => {
      if (!userId) return;
      const { data } = await Axios.get(
        `${serverUrl}/getfavoriteproductsids/${userId}`
      );

      if (data) clearInterval(refreshFunctionAndCheckServerStatus);

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }

      if (!data) return;
      setFavoritedProductsIds(data);
    };
    fetchFavoritedProductsIds();
    var refreshFunctionAndCheckServerStatus = setInterval(function () {
      fetchFavoritedProductsIds();
      fetchSlides();
    }, 1000);
  }, [serverUrl]);
  return (
    <>
      <ContentPc serverStatus={serverStatus}>
        <TopBar />
        <SliderMainPc />
        <Midcenter
          slideProductsIds={slideProductsIds}
          favoritedProductsIds={favoritedProductsIds}
          setFavoritedProductsIds={setFavoritedProductsIds}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
          handleAddCartProduct={handleAddCartProduct}
          handleSetPopupState={handleSetPopupState}
        />
      </ContentPc>
      <ContentMobile serverStatus={serverStatus}>
        <SliderMobile />
        <MidcenterMobile
          slideProductsIds={slideProductsIds}
          favoritedProductsIds={favoritedProductsIds}
          setFavoritedProductsIds={setFavoritedProductsIds}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
          handleAddCartProduct={handleAddCartProduct}
        />
      </ContentMobile>
    </>
  );
};

export default Content;
