import React from "react";
import ProductAmount from "./CardBoxInfo/ProductAmount";
import ProductBuySection from "./CardBoxInfo/ProductBuySection";
import ProductFreight from "./CardBoxInfo/ProductFreight";
import ProductPrice from "./CardBoxInfo/ProductPrice";
import ProductRate from "./CardBoxInfo/ProductRate";
import ProductTitle from "./CardBoxInfo/ProductTitle";

const CardBoxInfo = ({
  productTitle,
  productRate,
  setProductRate,
  productPrice,
  amount,
  setAmount,
  freightCost,
}) => {
  return (
    <main className="card_info">
      <ProductTitle productTitle={productTitle} />
      <ProductRate productRate={productRate} setProductRate={setProductRate} />
      <ProductPrice productPrice={productPrice} />
      <ProductAmount amount={amount} setAmount={setAmount} />
      <ProductFreight freightCost={freightCost} />
      <ProductBuySection />
    </main>
  );
};

export default CardBoxInfo;
