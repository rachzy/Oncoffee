import React from "react";

import ContentPc from "./ContentPc";
import TopBar from "./ContentPc/TopBar";
import SliderMainPc from "./ContentPc/SliderMainPc";
import Midcenter from "./ContentPc/Midcenter";

import ContentMobile from "./ContentMobile";
import SliderMobile from "./ContentMobile/SliderMobile";
import MidcenterMobile from "./ContentMobile/MidcenterMobile";

const Content = ({ handleFavoritedProductsChange }) => {
  return (
    <>
      <ContentPc>
        <TopBar />
        <SliderMainPc />
        <Midcenter
          handleFavoritedProductsChange={handleFavoritedProductsChange}
        />
      </ContentPc>
      <ContentMobile>
        <SliderMobile />
        <MidcenterMobile />
      </ContentMobile>
    </>
  );
};

export default Content;
