import React, { useRef } from "react";

import "../../css/ProductResponsive.css";
import CardBoxBrand from "./ContentMobile/CardBoxBrand";
import CardBoxImage from "./ContentMobile/CardBoxImage";
import ProductTitle from "./ContentMobile/ProductTitle";
import ProductPrice from "./ContentMobile/ProductPrice";
import Back from "./RComponents/Back";
import ProductFreight from "./ContentMobile/ProductFreight";
import Description from "./ContentMobile/Description";
import Comments from "./ContentMobile/Comments";
import BotoesBuy from "./ContentMobile/BotoesBuy";

const ContentMobile = ({
  product,
  amount,
  setAmount,
  favoriteProducts,
  cartProducts,
  handleHeartClick,
  handleAddToCartButtonClick,
}) => {
  const conteudoMobile = useRef(null);

  const showContentMobileWhenFullyLoaded = () => {
    if (!conteudoMobile) return;
    setTimeout(() => {
      conteudoMobile.current.classList.add("active");
    }, 50);
  };

  return (
    <section
      onLoad={showContentMobileWhenFullyLoaded}
      ref={conteudoMobile}
      className="conteudo_mobile"
    >
      <Back />

      <main className="top_mobile">
        <main className="card_box2">
          <CardBoxBrand productBrand={product.productBrand} />
          <CardBoxImage
            productId={product.productId}
            productImg={product.productImage}
            favoriteProducts={favoriteProducts}
            handleHeartClick={handleHeartClick}
          />
        </main>
      </main>

      <main className="product_info">
        <ProductTitle title={product.productTitle} />
        <ProductPrice
          amount={amount}
          setAmount={setAmount}
          productPrice={product.productPrice}
          productRemainingAmount={product.productStockAmount}
        />

        <ProductFreight freightCost={product.productPrice.freight} />

        <Description
          productDescription={product.productDescription}
          productDetails={product.productDetails}
        />

        <Comments productComments={product.productComments} />
      </main>

      <BotoesBuy
        productId={product.productId}
        handleAddToCartButtonClick={handleAddToCartButtonClick}
        cartProducts={cartProducts}
      />
    </section>
  );
};

export default ContentMobile;
