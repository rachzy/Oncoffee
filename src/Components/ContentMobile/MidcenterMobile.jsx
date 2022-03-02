import React, { useState, useEffect } from "react";

import getCookie from "../../globalFunctions/getCookie";
import Axios from "axios";
import displayError from "../../globalFunctions/displayErrors";

import ProductSection from "./MidcenterMobile/ProductSection";
import FeaturedPromotions from "./MidcenterMobile/FeaturedPromotions";
import OtherProductsSection from "./MidcenterMobile/OtherProductsSection";

import TopPromo from "./MidcenterMobile/TopPromo";

const MidcenterMobile = ({
  handleFavoritedProductsChange
}) => {

  const { serverUrl } = require("../../connection.json");

  const userId = getCookie("UID");

  const [slideProductsIds, setSlideProductsIds] = useState([]);
  const [favoritedProductsIds, setFavoritedProductsIds] = useState();

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await Axios.get(
        `${serverUrl}/getslides/featuredpromotions`
      ).catch(() => {
        return displayError("0", "SERVER_CONN_FAILED");
      });

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
      ).catch((error) => {
        return displayError("0", "SERVER_CONN_FAILED");
      });

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }

      if (!data) return;
      setFavoritedProductsIds(data);
    };
    fetchFavoritedProductsIds();
  }, [userId, serverUrl]);

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
