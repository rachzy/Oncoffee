import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendedCard = ({ name, category, imgSrc, imgAlt }) => {
  const navigate = useNavigate();
  const handleBuyClick = () => {
    navigate(`/search/0/${category}`);
  };
  return (
    <div className="recomendado-box">
      <div className="recomend-img">
        <img src={imgSrc} alt={imgAlt} style={{ display: "flex" }} />
      </div>
      <div className="recomendtext">
        <h2>
          Veja nossos <br /> {name}
        </h2>
        <a onClick={handleBuyClick} href="#top">
          Conferir
        </a>
      </div>
    </div>
  );
};

export default RecommendedCard;
