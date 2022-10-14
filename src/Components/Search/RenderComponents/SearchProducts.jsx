import React from "react";

import Loading from "../../PageComponents/Loading";
import Product from "../../PageComponents/Product";

const SearchProducts = ({
  products,
  favoriteProducts,
  cartProducts,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
}) => {
  if (products.length === 0) {
    return <Loading />;
  }
  if (products.message) {
    return <p className="callback-message">{products.message}</p>;
  }
  return products.map((product) => {
    return (
      <Product
        key={product.productId}
        productId={product.productId}
        productName={product.productTitle}
        productImage={product.productImage}
        productCategory={product.productCategory}
        productFinalPrice={product.productPrice.finalPrice}
        productDiscount={product.productPrice.discount}
        productDescription={product.productDescription}
        productGrade={product.productRate.finalRate}
        productTotalSales={product.productTotalOrders}
        favoriteProducts={favoriteProducts}
        handleAddCartProduct={handleAddCartProduct}
        handleRemoveCartProduct={handleRemoveCartProduct}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
        cartProducts={cartProducts}
        customStyle={{
          width: "fit-content",
          maxWidth: "200px",
          margin: "2vh",
        }}
      />
    );
  });
};

export default SearchProducts;
