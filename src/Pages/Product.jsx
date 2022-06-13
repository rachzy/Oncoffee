import React, { useEffect } from "react";

import ContentPC from "../Components/Product/ContentPC";
import ContentMobile from "../Components/Product/ContentMobile";

const Product = ({
  pageTitle,
  setHeaderPageTitle,
  handleFavoriteProductsChange,
  cartProducts,
  handleAddCartProduct,
}) => {
  useEffect(() => {
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);
  return (
    <>
      <ContentPC
        handleFavoriteProductsChange={handleFavoriteProductsChange}
        cartProducts={cartProducts}
        handleAddCartProduct={handleAddCartProduct}
      />
      <ContentMobile />
    </>
  );
};

export default Product;
