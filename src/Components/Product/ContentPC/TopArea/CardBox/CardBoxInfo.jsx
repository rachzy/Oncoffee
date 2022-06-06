import React from "react";

const CardBoxInfo = () => {
  return (
    <main className="card_info">
      <div className="product_name">
        <h2>
          exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo
          exemplo exemplo exemplo
        </h2>
      </div>
      <div className="product_avaliacao">
        <h2>
          <i className="fas fa-star"></i> 5,0{" "}
          <i className="fas fa-angle-down"></i>
        </h2>
        <div className="avaliacao_box">
          <ul className="stars">
            <h2>5 Estrelas</h2>
            <h2>4 Estrelas</h2>
            <h2>3 Estrelas</h2>
            <h2>2 Estrelas</h2>
            <h2>1 Estrelas</h2>
          </ul>
          <ul className="inner_line">
            <div className="line">
              <span></span>
            </div>
            <div className="line">
              <span></span>
            </div>
            <div className="line">
              <span></span>
            </div>
            <div className="line">
              <span></span>
            </div>
            <div className="line">
              <span></span>
            </div>
          </ul>
          <ul className="porcentagem">
            <h2>100%</h2>
            <h2>100%</h2>
            <h2>100%</h2>
            <h2>100%</h2>
            <h2>100%</h2>
          </ul>
        </div>
        <h3>9999 Avaliações</h3>
        <h3>9999 Pedidos</h3>
      </div>

      <div className="product_price">
        <h3>R$999,99</h3>
        <h2>R$999,99</h2>
        <h4>-50% OFF</h4>
        <h5>Dividido em até 99x de R$999,99 sem juros</h5>
      </div>

      <div className="product_quant">
        <h2>Quantidade:</h2>

        <div className="quantity">
          <button className="minus-btn" type="button" name="button">
            <img
              src="https://designmodo.com/demo/shopping-cart/minus.svg"
              alt=""
            />
          </button>
          <input type="text" name="name" value="1" />

          <button className="plus-btn" type="button" name="button">
            <img
              src="https://designmodo.com/demo/shopping-cart/plus.svg"
              alt=""
            />
          </button>
        </div>

        <h3>9999 Itens disponíveis</h3>
      </div>

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
