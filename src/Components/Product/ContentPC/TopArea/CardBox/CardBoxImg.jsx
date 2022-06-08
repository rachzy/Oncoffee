import React from "react";

const CardBoxImg = ({productImg}) => {
  return (
    <div className="card_img">
      <img
        src={require(`../../../../../imgs/${productImg}`)}
        alt="product-logo"
      />
      <div className="fav_hearth">
        <input type="checkbox" id="favhearth_check" />
        <label htmlFor="favhearth_check">
          <img
            id="checkheart"
            src={require(`../../../../../imgs/favhearth.png`)}
            alt="fav-heart"
          />
          <img
            id="heart"
            src={require(`../../../../../imgs/newhearth.png`)}
            alt="new-heart"
          />
        </label>
      </div>
    </div>
  );
};

export default CardBoxImg;
