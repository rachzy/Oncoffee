import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import { GlobalServerContext } from "../../../../../../App";

const ProductBuySection = ({
  productId,
  cartProducts,
  handleAddCartProduct,
}) => {
  const navigate = useNavigate();
  const { serverUrl, displayError } = useContext(GlobalServerContext);

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

  const handleAddToCartButtonClick = async () => {
    try {
      const { data } = await Axios.get(`${serverUrl}/getproduct/${productId}`);

      if (data.isError) {
        return displayError(data.errorCode, data.errno);
      }

      handleAddCartProduct(data);
      enableCartProductButton();
    } catch (err) {
      displayError(err, err.code);
    }
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
