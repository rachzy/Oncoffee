import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Axios from "axios";

import ContentPC from "../Components/Product/ContentPC";
import ContentMobile from "../Components/Product/ContentMobile";

import { GlobalServerContext } from "../App";

const Product = ({
  pageTitle,
  setHeaderPageTitle,
  favoriteProducts,
  cartProducts,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
  handleAddCartProduct,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);

  const { serverUrl, displayError, isLogged } = useContext(GlobalServerContext);

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

  const handleHeartClick = (e) => {
    if (!isLogged) {
      return navigate("/login");
    }

    const { id } = e.target;

    let isFavorited = false;

    if (id.startsWith("checkheart")) {
      isFavorited = true;
    }

    if (isFavorited) {
      console.log("removing");
      return handleRemoveFavoriteProduct(product);
    }
    handleAddFavoriteProduct(product);
  };

  const handleAddToCartButtonClick = () => {
    const newProduct = {
      productId: product.productId,
      productName: product.productTitle,
      productDescription: product.productDescription,
      productImgSrc: product.productImage,
      productImgAlt: product.productTitle,
      productFinalPrice: product.productPrice.finalPrice,
    };
    handleAddCartProduct(newProduct);
  };

  if (!product) {
    return null;
  }
  return (
    <>
      <ContentPC
        product={product}
        favoriteProducts={favoriteProducts}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        cartProducts={cartProducts}
        handleAddToCartButtonClick={handleAddToCartButtonClick}
        handleHeartClick={handleHeartClick}
        amount={amount}
        setAmount={setAmount}
      />
      <ContentMobile
        product={product}
        amount={amount}
        setAmount={setAmount}
        favoriteProducts={favoriteProducts}
        handleAddToCartButtonClick={handleAddToCartButtonClick}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
        handleHeartClick={handleHeartClick}
      />
    </>
  );
};

export default Product;
