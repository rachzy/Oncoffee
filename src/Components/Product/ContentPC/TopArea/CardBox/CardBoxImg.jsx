import React, { useState, useRef } from "react";

const CardBoxImg = ({
  favoriteProducts,
  handleHeartClick,
  productId,
  productImg,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const defaultHeart = useRef(null);
  const favoriteHeart = useRef(null);

  const renderFavoriteHeart = () => {
    if (!isLoaded || !favoriteProducts) return;

    const checkIfProductIsAlreadyFavorite = favoriteProducts.find(
      (product) => product.productId === parseInt(productId)
    );

    if (!checkIfProductIsAlreadyFavorite) {
      defaultHeart.current.classList.add("active");
      favoriteHeart.current.classList.remove("active");
      return;
    }

    defaultHeart.current.classList.remove("active");
    favoriteHeart.current.classList.add("active");
  };
  renderFavoriteHeart();

  return (
    <div
      onLoad={() => {
        setIsLoaded(true);
      }}
      className="card_img"
    >
      <img
        src={require(`../../../../../imgs/${productImg}`)}
        alt="product-logo"
      />
      <div className="fav_hearth">
        <input type="checkbox" id="favhearth_check" />
        <label htmlFor="favhearth_check">
          <img
            id="heart"
            ref={defaultHeart}
            className="hearticon"
            onClick={handleHeartClick}
            src={require(`../../../../../imgs/newhearth.png`)}
            alt="new-heart"
          />
          <img
            id="checkheart"
            ref={favoriteHeart}
            className="hearticon"
            onClick={handleHeartClick}
            src={require(`../../../../../imgs/favhearth.png`)}
            alt="fav-heart"
          />
        </label>
      </div>
    </div>
  );
};

export default CardBoxImg;
