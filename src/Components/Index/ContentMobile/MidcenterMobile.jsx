import React, { useState, useEffect, useContext } from "react";

import Axios from "axios";

import ProductSection from "./MidcenterMobile/ProductSection";
import FeaturedPromotions from "./MidcenterMobile/FeaturedPromotions";
import OtherProductsSection from "./MidcenterMobile/OtherProductsSection";
import TopPromo from "./MidcenterMobile/TopPromo";

import { GlobalServerContext } from "../../../App";

const MidcenterMobile = ({
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
  favoriteProducts,
}) => {
  const { serverUrl, displayError } = useContext(GlobalServerContext);

  const [slideProductsIds, setSlideProductsIds] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/ads/getslides/featuredpromotions`
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
  }, [serverUrl, displayError]);

  return (
    <>
      <TopPromo />
      <ProductSection
        title="Com Desconto"
        category="discount"
        favoriteProducts={favoriteProducts}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
      />

      <ProductSection
        title="Mais Vendidos"
        category="mostsolds"
        favoriteProducts={favoriteProducts}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
      />

      <FeaturedPromotions slideProductsIds={slideProductsIds} />

      <OtherProductsSection
        favoriteProducts={favoriteProducts}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
      />
    </>
  );
};

export default MidcenterMobile;
