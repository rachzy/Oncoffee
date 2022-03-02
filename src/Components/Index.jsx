import React, { useState, useEffect } from "react";

import Axios from "axios";

import "../css/Cards.css";
import "../css/Mid.css";
import "../css/Mobile.css";
import "../css/Top.css";

import getCookie from "../globalFunctions/getCookie";
import displayError from "../globalFunctions/displayErrors";
import setPageTitle from "../globalFunctions/setPageTitle";

import ContentPc from "./Index/ContentPc";
import TopBar from "./ContentPc/TopBar";
import SliderMainPc from "./ContentPc/SliderMainPc";
import Midcenter from "./ContentPc/Midcenter";

import ContentMobile from "./Index/ContentMobile";
import SliderMobile from "./ContentMobile/SliderMobile";
import MidcenterMobile from "./ContentMobile/MidcenterMobile";

const Index = ({
  pageTitle,
  setHeaderPageTitle,
  handleAddCartProduct,
  handleFavoritedProductsChange,
  handleSetPopupState,
  serverStatus,
}) => {
  useEffect(() => {
    setPageTitle(pageTitle);
    setHeaderPageTitle(pageTitle);
  }, [pageTitle]);

  return (
    <>
      <ContentPc serverStatus={serverStatus}>
        <TopBar />
        <SliderMainPc />
        <Midcenter
          serverStatus={serverStatus}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
          handleAddCartProduct={handleAddCartProduct}
          handleSetPopupState={handleSetPopupState}
        />
      </ContentPc>
      <ContentMobile serverStatus={serverStatus}>
        <SliderMobile />
        <MidcenterMobile
          serverStatus={serverStatus}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
          handleAddCartProduct={handleAddCartProduct}
        />
      </ContentMobile>
    </>
  );
};

export default Index;
