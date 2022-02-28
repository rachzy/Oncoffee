import React, { useState, useEffect } from "react";

import getCookie from "../../globalFunctions/getCookie";
import Axios from "axios";
import displayError from "../../globalFunctions/displayErrors";

import ProductSection from "./MidcenterMobile/ProductSection";
import FeaturedPromotions from "./MidcenterMobile/FeaturedPromotions";
import OtherProductsSection from "./MidcenterMobile/OtherProductsSection";

import TopPromo from "./MidcenterMobile/TopPromo";

const MidcenterMobile = ({
  slideProductsIds,
  favoritedProductsIds,
  setFavoritedProductsIds,
  handleFavoritedProductsChange
}) => {
  return (
    <>
      <TopPromo />
      <ProductSection
        title="Com Desconto"
        category="discount"
        favoritedProductsIds={favoritedProductsIds}
        setFavoritedProductsIds={setFavoritedProductsIds}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
      />

      <ProductSection
        title="Mais Vendidos"
        category="mostsolds"
        favoritedProductsIds={favoritedProductsIds}
        setFavoritedProductsIds={setFavoritedProductsIds}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
      />

      <FeaturedPromotions slideProductsIds={slideProductsIds} />

      <OtherProductsSection
        favoritedProductsIds={favoritedProductsIds}
        setFavoritedProductsIds={setFavoritedProductsIds}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
      />
    </>
  );
};

export default MidcenterMobile;
