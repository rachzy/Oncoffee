import React, { useState, useRef } from "react";

const CardBoxImage = ({
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
      className="card_img2"
    >
      <img src={require(`../../../imgs/${productImg}`)} alt="" />
      <div className="fav_hearth2">
        <input type="checkbox" id="favhearth_check2" />
        <label htmlFor="favhearth_check2">
          <img
            id="checkheart2"
            className="hearticon"
            src={require(`../../../imgs/favhearth.png`)}
            onClick={handleHeartClick}
            alt="checkheart2"
            ref={favoriteHeart}
          />
          <img
            id="heart2"
            className="hearticon"
            src={require(`../../../imgs/newhearth.png`)}
            onClick={handleHeartClick}
            alt="heart"
            ref={defaultHeart}
          />
        </label>
      </div>
    </div>
  );
};

export default CardBoxImage;
