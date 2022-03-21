import React, { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";

const SlideFeaturedPc = ({
  slideClass,
  typeClass,
  discountPercentage,
  endDate,
  imgSrc,
  imgAlt,
  name,
  realPrice,
  description,
  hrefPage,
}) => {
  function initialState() {
    return {isLoading: true};
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

  const returnByTypeClass = () => {
    if (remainingTime.isLoading) return;
    if (typeClass === 1) {
      return (
        <div className={slideClass}>
          <div className="slide_product">
            <div className="slide_product_img">
              <div className="slide_product_promo">
                <h2>PROMOÇÃO</h2>
              </div>

              <div className="slide_product_off">
                <h2>{discountPercentage}%</h2>
                <h3>OFF</h3>
                <div className="countdown">{remainingTime}</div>
              </div>
              <img
                src={require(`../../../../../imgs/${imgSrc}`)}
                alt={imgAlt}
              />
            </div>
            <div className="slide_product_text">
              <h2>{name}</h2>
              <h4>R${returnPrice(realPrice)}</h4>
              <h3>R${calculateDiscount()}</h3>
              <p>{description}</p>
              <a href={hrefPage}>Comprar</a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={slideClass}>
          <div className="slide_product2">
            <div className="slide_product_text2">
              <h2>{name}</h2>
              <h4>R${returnPrice(realPrice)}</h4>
              <h3>R${calculateDiscount()}</h3>
              <p>{description}</p>
              <a href={hrefPage}>Comprar</a>
            </div>

            <div className="slide_product_img2">
              <div className="slide_product_promo2">
                <h2>PROMOÇÃO</h2>
              </div>

              <div className="slide_product_off2">
                <h2>{discountPercentage}%</h2>
                <h3>OFF</h3>
                <div className="countdown">{remainingTime}</div>
              </div>
              <img src={require(`../../../../../imgs/${imgSrc}`)} alt={imgAlt} />
            </div>
          </div>
        </div>
      );
    }
  };
  return <>{returnByTypeClass()}</>;
};

export default SlideFeaturedPc;
