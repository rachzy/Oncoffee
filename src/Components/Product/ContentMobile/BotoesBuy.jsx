import React, { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const BotoesBuy = ({ cartProducts, productId, handleAddToCartButtonClick }) => {
  const navigate = useNavigate();

  const addToCartBtn = useRef(null);

  const enableCartProductButton = () => {
    addToCartBtn.current.style.background = "rgb(4, 128, 185)";
    addToCartBtn.current.textContent = "Adicionado ao Carrinho";
  };

  const disableCartProductButton = () => {
    addToCartBtn.current.style.background = "transparent";
    addToCartBtn.current.textContent = "Adicionar ao Carrinho";
  };

  useEffect(() => {
    const checkIfProductIsAlreadyOnCart = () => {
      if (!addToCartBtn) return;
      const checkIfProductIsAlreadyOnCart = cartProducts.filter(
        (product) => product.productId === parseInt(productId)
      );

      if (checkIfProductIsAlreadyOnCart.length === 0)
        return disableCartProductButton();
      enableCartProductButton();
    };
    checkIfProductIsAlreadyOnCart();
  }, [cartProducts, productId]);

  return (
    <main className="botoes_buy">
      <div className="buttons_area">
        <button
          onClick={() => {
            navigate(`/checkout/products=${productId}`);
          }}
        >
          Comprar
        </button>
        <button ref={addToCartBtn} onClick={handleAddToCartButtonClick}>
          Adicionar ao Carrinho
        </button>
      </div>
    </main>
  );
};

export default BotoesBuy;
