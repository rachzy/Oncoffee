import React, { useState, useEffect } from "react";

import Axios from "axios";

import displayError from "../../../../globalFunctions/displayErrors";

import ProductLine from "./ProductSection/ProductLine";
import Product from "./ProductSection/Product";

const ProductSection = ({
  title,
  category,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
  favoriteProducts,
}) => {
  const [products, setProducts] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl } = require("../../../../connection.json"); //Import serverUrl (Ex: http://localhost:3001);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getmany/${category}`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setProducts(data);
      } catch (err) {
        return displayError(err.message, err.code);
      }
    };
    fetchProducts();
  }, [serverUrl, category]);
  return (
    <ProductLine title={title} category={category}>
      {products.map((product) => {
        if (!products) return null;
        return (
          <Product
            key={product.productId}
            productId={product.productId}
            productName={product.productTitle}
            productDescription={product.productDescription}
            productImgSrc={product.productImage}
            productImgAlt={product.productTitle}
            productFinalPrice={product.productPrice.finalPrice}
            productDiscount={product.productPrice.discount}
            handleAddFavoriteProduct={handleAddFavoriteProduct}
            handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
            favoriteProducts={favoriteProducts}
          />
        );
      })}
    </ProductLine>
  );
};

export default ProductSection;
