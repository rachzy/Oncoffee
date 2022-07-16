import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProductBuySection = ({
  productId,
  cartProducts,
  handleAddToCartButtonClick,
}) => {
  const navigate = useNavigate();

  const addToCartBtn = useRef(null);

  const enableCartProductButton = () => {
    addToCartBtn.current.style.background = "rgb(4, 128, 185)";
    addToCartBtn.current.value = "Adicionado ao Carrinho";
  };

  const disableCartProductButton = () => {
    addToCartBtn.current.style.background = "transparent";
    addToCartBtn.current.value = "Adicionar ao Carrinho";
  }

  useEffect(() => {
    const checkIfProductIsAlreadyOnCart = () => {
      if (!addToCartBtn) return;
      const checkIfProductIsAlreadyOnCart = cartProducts.filter(
        (product) => product.productId === parseInt(productId)
      );

      if (checkIfProductIsAlreadyOnCart.length === 0) return disableCartProductButton();
      enableCartProductButton();
    };
    checkIfProductIsAlreadyOnCart();
  }, [cartProducts, productId]);

  const handleBuyButtonClick = () => {
    navigate(`/purchase/${productId}`);
  };

  return (
    <div className="product_comprar">
      <input onClick={handleBuyButtonClick} type="button" value="Comprar" />
      <input
        ref={addToCartBtn}
        onClick={handleAddToCartButtonClick}
        type="button"
      />
    </div>
  );
};

export default ProductBuySection;
