import React, { useEffect } from "react";

import "../css/Cards.css";
import "../css/Mid.css";
import "../css/Mobile.css";
import "../css/Top.css";

import setPageTitle from "../globalFunctions/setPageTitle";

import ContentPc from "./Index/ContentPc";
import TopBar from "./Index/ContentPc/TopBar";
import SliderMainPc from "./Index/ContentPc/SliderMainPc";
import Midcenter from "./Index/ContentPc/Midcenter";

import ContentMobile from "./Index/ContentMobile";
import SliderMobile from "./Index/ContentMobile/SliderMobile";
import MidcenterMobile from "./Index/ContentMobile/MidcenterMobile";
import Buttonsmo from "./Index/ContentMobile/Buttonsmo";

const Index = ({
  pageTitle,
  setHeaderPageTitle,
  isIndexAlreadyLoaded,
  setIndexAlreadyLoaded,
  handleAddCartProduct,
  handleRemoveCartProduct,
  cartProducts,
  handleFavoritedProductsChange,
  handleSetPopupState,
  serverStatus,
}) => {
  useEffect(() => {
    setPageTitle(pageTitle);
    setHeaderPageTitle(pageTitle);
  }, [setHeaderPageTitle, pageTitle]);

  return (
    <>
      <ContentPc
        serverStatus={serverStatus}
        isIndexAlreadyLoaded={isIndexAlreadyLoaded}
        setIndexAlreadyLoaded={setIndexAlreadyLoaded}
      >
        <TopBar />
        <SliderMainPc />
        <Midcenter
          serverStatus={serverStatus}
          handleSetPopupState={handleSetPopupState}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
          handleAddCartProduct={handleAddCartProduct}
          handleRemoveCartProduct={handleRemoveCartProduct}
          cartProducts={cartProducts}
        />
      </ContentPc>
      <ContentMobile
        serverStatus={serverStatus}
        isIndexAlreadyLoaded={isIndexAlreadyLoaded}
        setIndexAlreadyLoaded={setIndexAlreadyLoaded}
      >
        <SliderMobile />
        <MidcenterMobile
          serverStatus={serverStatus}
          isIndexAlreadyLoaded={isIndexAlreadyLoaded}
          setIndexAlreadyLoaded={setIndexAlreadyLoaded}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
          handleAddCartProduct={handleAddCartProduct}
          handleRemoveCartProduct={handleRemoveCartProduct}
          cartProducts={cartProducts}
        />
        <Buttonsmo />
      </ContentMobile>
    </>
  );
};

export default Index;
