import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  endDate,
  realPrice,
  discountPercentage,
  imgSrc,
  imgAlt,
  productName,
  hrefPage,
}) => {
  //State to define that the state is still loading
  function initialState() {
    return { isLoading: true };
  }

  const [remainingTime, setRemainingTime] = useState(initialState());

  const calculateRemainingTime = () => {
    //Transform the endDate into a DateConstructor and gets todays date
    let getEndDate = new Date(endDate).getTime();
    let getNowDate = new Date().getTime();

    let distance = getEndDate - getNowDate;

    let days = Math.floor(
      (distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days < 10) {
      days = "0" + days;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    const getRemainingTime =
      days + " : " + hours + " : " + minutes + " : " + seconds;
    
    setRemainingTime(getRemainingTime);
  };

  setInterval(calculateRemainingTime, 1000);

  const calculateDiscount = () => {
    const productLessDiscount = Math.floor(
      (realPrice * discountPercentage) / 100
    );
    const returnFinalPriceWithCommas = returnPrice(productLessDiscount);
    return returnFinalPriceWithCommas;
  };

  const returnPrice = (price) => {
    const splitFinalPrice = price.toString().split(".");
    let getProductFinalPrice = price;
    if (splitFinalPrice.length === 1) {
      getProductFinalPrice = price + ".00";
    }
    const finalPriceWithCommas = getProductFinalPrice
      .toString()
      .replace(".", ",");
    return finalPriceWithCommas;
  };

  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`${hrefPage}`);
    window.location.href = "#top";
  }

  const returnIfItsLoaded = () => {
    if (remainingTime.isLoading) return;
    return (
      <div className="card-mobile">
        <div className="desconto-area">
          <h3>{discountPercentage}%</h3>
          <h3>OFF</h3>
        </div>
        <div className="favbtt">
          <input type="checkbox" name="" id="favbtt" />
          <label htmlFor="favbtt">
            <img id="imgreleased" src="/img/newhearth.png" alt="" />
            <img id="imgpressed" src="/img/favhearth.png" alt="" />
          </label>
        </div>
        <div className="countdown3">
          <p>{remainingTime}</p>
        </div>
        <div className="cardmo-img">
          <img src={require(`../../../../imgs/${imgSrc}`)} alt={imgAlt} />
        </div>
        <div className="cardmo-text">
          <h2>{productName}</h2>

          <h3>R$ {calculateDiscount()}</h3>
          <a onClick={handleProductClick}>Comprar</a>
        </div>
      </div>
    );
  };

  return (
      <>
        {returnIfItsLoaded()}
      </>
  );
};

export default ProductCard;
