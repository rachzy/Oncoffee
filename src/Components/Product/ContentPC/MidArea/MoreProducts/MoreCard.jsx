import React from "react";

const MoreCard = () => {
  return (
    <div className="more_card">
      <div className="more_img">
        <img src={require(`../../../../../imgs/cafegourmet.png`)} alt="cafe-gourmet" />
      </div>
      <div className="more_price">
        <h2>R$999</h2>
      </div>
      <button>Ver Mais</button>
    </div>
  );
};

export default MoreCard;
