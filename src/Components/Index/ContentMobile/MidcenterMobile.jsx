import React, { useState, useEffect, useContext } from "react";

import Axios from "axios";

import ProductSection from "./MidcenterMobile/ProductSection";
import FeaturedPromotions from "./MidcenterMobile/FeaturedPromotions";
import OtherProductsSection from "./MidcenterMobile/OtherProductsSection";
import TopPromo from "./MidcenterMobile/TopPromo";

import { GlobalServerContext } from "../../../App";

const MidcenterMobile = ({ handleFavoritedProductsChange }) => {
  const { serverUrl, displayError } = useContext(GlobalServerContext);

  const [slideProductsIds, setSlideProductsIds] = useState([]);
  const [favoritedProductsIds, setFavoritedProductsIds] = useState();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/getslides/featuredpromotions`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setSlideProductsIds(data);
      } catch (err) {
        displayError(err);
      }
    };
    fetchSlides();

    const fetchFavoritedProductsIds = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/user/getfavoriteproductsids/`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        if (!data) return;
        setFavoritedProductsIds(data);
      } catch (err) {
        displayError(err);
      }
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
