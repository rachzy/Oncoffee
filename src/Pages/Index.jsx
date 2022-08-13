import React, { useEffect } from "react";

import "../css/Cards.css";
import "../css/Mid.css";
import "../css/Mobile.css";
import "../css/Top.css";

import setPageTitle from "../globalFunctions/setPageTitle";

import ContentPc from "../Components/Index/ContentPc";
import TopBar from "../Components/Index/ContentPc/TopBar";
import SliderMainPc from "../Components/Index/ContentPc/SliderMainPc";
import Midcenter from "../Components/Index/ContentPc/Midcenter";

import ContentMobile from "../Components/Index/ContentMobile";
import SliderMobile from "../Components/Index/ContentMobile/SliderMobile";
import MidcenterMobile from "../Components/Index/ContentMobile/MidcenterMobile";
import Buttonsmo from "../Components/Index/ContentMobile/Buttonsmo";

const Index = ({
  pageTitle,
  setHeaderPageTitle,
  isIndexAlreadyLoaded,
  setIndexAlreadyLoaded,
  handleAddCartProduct,
  handleRemoveCartProduct,
  cartProducts,
  favoriteProducts,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
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
          handleAddFavoriteProduct={handleAddFavoriteProduct}
          handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
          handleAddCartProduct={handleAddCartProduct}
          handleRemoveCartProduct={handleRemoveCartProduct}
          cartProducts={cartProducts}
          favoriteProducts={favoriteProducts}
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
          handleAddFavoriteProduct={handleAddFavoriteProduct}
          handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
          handleAddCartProduct={handleAddCartProduct}
          handleRemoveCartProduct={handleRemoveCartProduct}
          cartProducts={cartProducts}
          favoriteProducts={favoriteProducts}
        />
        <Buttonsmo />
      </ContentMobile>
    </>
  );
};

export default Index;
