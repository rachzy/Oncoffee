import React, { useState } from "react";

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
  favoriteProducts,
  handleFavoriteProductsChange,
  cartProducts,
  handleAddCartProduct,
  amount,
  setAmount,
}) => {
  const [productRate, setProductRate] = useState(0);

  const handleHeartClick = () => {
    handleFavoriteProductsChange(product);
  }

  return (
    <section className="conteudo_pc">
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
          productRate={product.productRate}
          productTotalOrders={product.productTotalOrders}
          setProductRate={setProductRate}
          productPrice={product.productPrice}
          amount={amount}
          setAmount={setAmount}
          productRemainingAmount={product.productRemainingAmount}
          freightCost={product.productPrice.freight}
          handleFavoriteProductsChange={handleFavoriteProductsChange}
          cartProducts={cartProducts}
          handleAddCartProduct={handleAddCartProduct}
        />
      </TopArea>

      {/* Mid-Area */}
      <MidArea>
        <MoreProducts>
          <MoreCard />
          <MoreCard />
          <MoreCard />
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
