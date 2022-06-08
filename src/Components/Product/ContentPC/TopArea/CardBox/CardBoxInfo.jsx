import React from "react";
import ProductAmount from "./CardBoxInfo/ProductAmount";
import ProductPrice from "./CardBoxInfo/ProductPrice";
import ProductRate from "./CardBoxInfo/ProductRate";
import ProductTitle from "./CardBoxInfo/ProductTitle";

const CardBoxInfo = ({ productTitle, productRate, productPrice, amount, setAmount }) => {
  return (
    <main className="card_info">
      <ProductTitle productTitle={productTitle} />
      <ProductRate productRate={productRate} />
      <ProductPrice productPrice={productPrice} />
      <ProductAmount amount={amount} setAmount={setAmount} />

      <div className="product_frete">
        <h2>Calcule o frete atravéz do CEP</h2>
        <div className="input_frete">
          <input type="text" className="frete" placeholder="00000-000" />
          <input type="button" className="calcular" value="Calcular" />
        </div>
        <a href="#">Não sei o meu CEP</a>
        <h2>Valor do Frete: R$999,99</h2>
      </div>

      <div className="product_comprar">
        <input type="button" value="Comprar" />
        <input type="button" value="Adicionar ao Carrinho" />
      </div>
    </main>
  );
};

export default CardBoxInfo;
