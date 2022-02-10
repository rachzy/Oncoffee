import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({categoryId, categoryName, categoryImgSrc, categoryImgAlt}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/search/0/${categoryId}`);
    document.querySelector(".swichline").style.marginLeft = '3%'
    document.querySelector("#content-search").classList.remove("active");
    window.location.href = "#top";
  }
  return (
    <label onClick={handleCardClick} className="categobox">
      <div className="catego_img">
        <img src={require(`../../../../imgs/${categoryImgSrc}`)} alt={categoryImgAlt} />
        <div className="cateback"></div>
      </div>
      <h2>{categoryName}</h2>
    </label>
  );
};

export default ProductCard;
