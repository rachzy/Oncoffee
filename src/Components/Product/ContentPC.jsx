import React, { useState, useRef } from "react";

import "../../css/Product.css";

import Back from "./RComponents/Back";
import BotArea from "./ContentPC/BotArea";
import Comments from "./ContentPC/BotArea/Comments";
import MidArea from "./ContentPC/MidArea";
import MidGrid from "./ContentPC/MidArea/MidGrid";
import ProductDesc from "./ContentPC/MidArea/MidGrid/ProductDesc";
import MoreDetails from "./ContentPC/MidArea/MoreDetails";
import MoreImgs from "./ContentPC/MidArea/MoreImgs";
import MoreProducts from "./ContentPC/MidArea/MoreProducts";
import MoreCard from "./ContentPC/MidArea/MoreProducts/MoreCard";
import TopArea from "./ContentPC/TopArea";

import CardBox from "./ContentPC/TopArea/CardBox";
import CardBoxImg from "./ContentPC/TopArea/CardBox/CardBoxImg";
import CardBoxInfo from "./ContentPC/TopArea/CardBox/CardBoxInfo";
import CardBoxText from "./ContentPC/TopArea/CardBox/CardBoxText";

const ContentPC = ({
  product,
  otherProducts,
  favoriteProducts,
  handleFavoriteProductsChange,
  cartProducts,
  handleAddToCartButtonClick,
  handleHeartClick,
  amount,
  setAmount,
}) => {
  const conteudoPc = useRef(null);
  const [productRate, setProductRate] = useState(0);

  const showContentPcWhenFullyLoaded = () => {
    if (!conteudoPc) return;
    setTimeout(() => {
      conteudoPc.current.classList.add("active");
    }, 50);
  };

  return (
    <section
      onLoad={showContentPcWhenFullyLoaded}
      ref={conteudoPc}
      className="conteudo_pc"
    >
      <Back />

      {/* Top-Area */}
      <TopArea>
        <CardBox>
          <CardBoxText productBrand={product.productBrand} />
          <CardBoxImg
            favoriteProducts={favoriteProducts}
            handleHeartClick={handleHeartClick}
            productImg={product.productImage}
            productId={product.productId}
          />
        </CardBox>
        <CardBoxInfo
          productId={product.productId}
          productTitle={product.productTitle}
          productDescription={product.productDescription}
          productPrice={product.productPrice}
          productRate={product.productRate}
          productTotalOrders={product.productTotalOrders}
          setProductRate={setProductRate}
          amount={amount}
          setAmount={setAmount}
          productStockAmount={product.productStockAmount}
          freightCost={product.productPrice.freight}
          handleFavoriteProductsChange={handleFavoriteProductsChange}
          cartProducts={cartProducts}
          handleAddToCartButtonClick={handleAddToCartButtonClick}
        />
      </TopArea>

      {/* Mid-Area */}
      <MidArea>
        <MoreProducts>
          {otherProducts.map((product) => {
            return (
              <MoreCard
                productId={product.productId}
                productImage={product.productImage}
                productFinalPrice={product.productPrice.finalPrice}
              />
            );
          })}
        </MoreProducts>
        <MidGrid>
          <ProductDesc
            title="Descrição do Produto"
            description={product.productDescription}
          />
          <MoreDetails productDetails={product.productDetails} />
          <MoreImgs productImages={product.productImages} />
        </MidGrid>
      </MidArea>

      <BotArea>
        <Comments
          productRate={productRate}
          productComments={product.productComments}
        />
      </BotArea>
    </section>
  );
};

export default ContentPC;
