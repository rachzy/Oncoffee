import React from "react";

import ProductCard from "./FeaturedPromotions/ProductCard";

const FeaturedPromotions = ({slideProductsIds}) => {
  return (
    <main className="midmobile">
      <h2>Promoções Relampago</h2>
      <div className="midmobile-overflow">
        {slideProductsIds.map((product) => {
          if (product.isLoading) return;
          return (
            <ProductCard
              key={product.productId}
              productName={product.productTitle}
              imgSrc={product.productImage}
              imgAlt={product.productTitle}
              realPrice={product.productPrice.realPrice}
              discountPercentage={product.productPrice.discount}
              endDate={product.slideEndDate}
              hrefPage={`./product/${product.productId}`}
            />
          );
        })}
      </div>
    </main>
  );
};

export default FeaturedPromotions;
