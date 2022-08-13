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

  //Product State
  const [product, setProduct] = useState();
  const [otherProducts, setOtherProducts] = useState([]);

  //State that controls the amount of products that will be bought by the user
  const [amount, setAmount] = useState(1);
  const [productFinalPrice, setProductFinalPrice] = useState(
    product?.productPrice.finalPrice || 0
  );

  useEffect(() => {
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);

  const { serverUrl, displayError, isLogged } = useContext(GlobalServerContext);

  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    const fetchOtherProducts = async (category) => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getmany/${category}`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setOtherProducts(data);
      } catch (err) {
        displayError(err.message, err.code);
      }
    };
    const fetchProductData = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getsingle/${productId}`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setProduct(data);
        fetchOtherProducts(data.productCategory);
      } catch (err) {
        displayError(err.message, err.code);
      }
    };
    fetchProductData();
  }, [displayError, productId, serverUrl]);

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
        otherProducts={otherProducts}
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
