import React, { useState, useEffect } from "react";

import getCookie from "../../globalFunctions/getCookie";
import Axios from "axios";
import displayError from "../../globalFunctions/displayErrors";

import ProductSection from "./MidcenterMobile/ProductSection";
import FeaturedPromotions from "./MidcenterMobile/FeaturedPromotions";
import OtherProductsSection from "./MidcenterMobile/OtherProductsSection";

import TopPromo from "./MidcenterMobile/TopPromo";

const MidcenterMobile = ({ handleFavoritedProductsChange }) => {
  const userId = getCookie("UID");
  const [favoritedProductsIds, setFavoritedProductsIds] = useState();

  const { serverUrl } = require("../../connection.json");

  useEffect(() => {
    const fetchFavoritedProductsIds = async () => {
      if (!userId) return;
      const { data } = await Axios.get(
        `${serverUrl}/getfavoriteproductsids/${userId}`
      );
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      if (!data) return;
      setFavoritedProductsIds(data);
    };
    fetchFavoritedProductsIds();
  }, [serverUrl]);
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

      <FeaturedPromotions />

      <OtherProductsSection
        favoritedProductsIds={favoritedProductsIds}
        setFavoritedProductsIds={setFavoritedProductsIds}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
      />
    </>
  );
};

export default MidcenterMobile;
