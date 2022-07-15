import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Axios from "axios";

import ContentPC from "../Components/Product/ContentPC";
import ContentMobile from "../Components/Product/ContentMobile";

import { GlobalServerContext } from "../App";

const Product = ({
  pageTitle,
  setHeaderPageTitle,
  favoriteProducts,
  handleFavoriteProductsChange,
  cartProducts,
  handleAddCartProduct,
}) => {
  useEffect(() => {
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);

  const { serverUrl, displayError } = useContext(GlobalServerContext);

  const params = useParams();
  const { productId } = params;

  //Product State
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getsingle/${productId}`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setProduct(data);
      } catch (err) {
        displayError(err.message, err.code);
      }
    };
    fetchProductData();
  }, [displayError, productId, serverUrl]);

  //State that controls the amount of products that will be bought by the user
  const [amount, setAmount] = useState(1);

  if (!product) {
    return null;
  }
  return (
    <>
      <ContentPC
        product={product}
        favoriteProducts={favoriteProducts}
        handleFavoriteProductsChange={handleFavoriteProductsChange}
        cartProducts={cartProducts}
        handleAddCartProduct={handleAddCartProduct}
        amount={amount}
        setAmount={setAmount}
      />
      <ContentMobile
        product={product}
        amount={amount}
        setAmount={setAmount}
        favoriteProducts={favoriteProducts}
        handleFavoriteProductsChange={handleFavoriteProductsChange}
      />
    </>
  );
};

export default Product;
