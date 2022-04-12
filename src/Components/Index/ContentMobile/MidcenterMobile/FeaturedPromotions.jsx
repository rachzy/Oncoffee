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
              productName={product.productName}
              imgSrc={product.productImgSrc}
              imgAlt={product.productImgAlt}
              realPrice={product.productPrice}
              discountPercentage={product.productDiscount}
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
