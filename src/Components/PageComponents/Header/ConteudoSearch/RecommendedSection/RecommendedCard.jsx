import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendedCard = ({ name, category, imgSrc, imgAlt }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/search/0/${category}`);
    document.querySelector(".swichline").style.marginLeft = "3%";
    document.querySelector("#content-search").classList.remove("active");
    window.scrollTo(0, 0);
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
        <a onClick={handleBuyClick}>Conferir</a>
      </div>
    </div>
  );
};

export default RecommendedCard;
