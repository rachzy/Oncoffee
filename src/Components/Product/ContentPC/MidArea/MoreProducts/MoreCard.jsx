import React from "react";
import { useNavigate } from "react-router-dom";

const MoreCard = ({ productId, productImage, productFinalPrice }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/product/${productId}`);
        window.scrollTo(0, 0);
      }}
      className="more_card"
    >
      <div className="more_img">
        <img
          src={require(`../../../../../imgs/${productImage}`)}
          alt="cafe-gourmet"
        />
      </div>
      <div className="more_price">
        <h2>R$ {productFinalPrice.toFixed(2)}</h2>
      </div>
      <button>Ver Mais</button>
    </div>
  );
};

export default MoreCard;
