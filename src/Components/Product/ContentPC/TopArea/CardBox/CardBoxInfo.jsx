import React from "react";
import ProductAmount from "./CardBoxInfo/ProductAmount";
import ProductBuySection from "./CardBoxInfo/ProductBuySection";
import ProductFreight from "./CardBoxInfo/ProductFreight";
import ProductPrice from "./CardBoxInfo/ProductPrice";
import ProductRate from "./CardBoxInfo/ProductRate";
import ProductTitle from "./CardBoxInfo/ProductTitle";

const CardBoxInfo = ({
  productId,
  productTitle,
  productRate,
  productTotalOrders,
  setProductRate,
  productPrice,
  amount,
  setAmount,
  productStockAmount,
  freightCost,
  cartProducts,
  handleAddToCartButtonClick,
}) => {
  return (
    <main className="card_info">
      <ProductTitle productTitle={productTitle} />
      <ProductRate
        productRate={productRate}
        setProductRate={setProductRate}
        productTotalOrders={productTotalOrders}
      />
      <ProductPrice productPrice={productPrice} />
      <ProductAmount
        amount={amount}
        setAmount={setAmount}
        productStockAmount={productStockAmount}
      />
      <ProductFreight freightCost={freightCost} />
      <ProductBuySection
        productId={productId}
        cartProducts={cartProducts}
        handleAddToCartButtonClick={handleAddToCartButtonClick}
      />
    </main>
  );
};

export default CardBoxInfo;
