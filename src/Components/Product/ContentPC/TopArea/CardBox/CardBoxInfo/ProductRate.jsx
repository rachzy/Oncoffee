import React from "react";

const ProductRate = ({ productRate, setProductRate }) => {
  //RATE
  class Rate {
    constructor(productRate) {
      const { oneStars, twoStars, threeStars, fourStars, fiveStars } =
        productRate;

      this.getTotalAmountOfRates = () => {
        const getTotalAmountOfRates =
          oneStars + twoStars + threeStars + fourStars + fiveStars;
        return getTotalAmountOfRates;
      };

      this.getFinalRate = () => {
        const finalRate =
          (1 * oneStars +
            2 * twoStars +
            3 * threeStars +
            4 * fourStars +
            5 * fiveStars) /
          this.getTotalAmountOfRates();
        const finalRateRounded = Math.round(finalRate * 10) / 10;
        setProductRate(finalRateRounded);
        return finalRateRounded;
      };

      this.getStarPercentage = (starType) => {
        const getStarType = productRate[starType];
        if (!getStarType) return;

        const calculateStarTypePercentage =
          (getStarType * 100) / this.getTotalAmountOfRates();
        return calculateStarTypePercentage();
      };
    }
  }

  const rate = new Rate(productRate);
  return (
    <div className="product_avaliacao">
      <h2>
        <i className="fas fa-star"></i> {rate.getFinalRate()}
        <i className="fas fa-angle-down"></i>
      </h2>
      <div className="avaliacao_box">
        <ul className="stars">
          <h2>5 Estrelas</h2>
          <h2>4 Estrelas</h2>
          <h2>3 Estrelas</h2>
          <h2>2 Estrelas</h2>
          <h2>1 Estrelas</h2>
        </ul>
        <ul className="inner_line">
          <div className="line">
            <span></span>
          </div>
          <div className="line">
            <span></span>
          </div>
          <div className="line">
            <span></span>
          </div>
          <div className="line">
            <span></span>
          </div>
          <div className="line">
            <span></span>
          </div>
        </ul>
        <ul className="porcentagem">
          <h2>100%</h2>
          <h2>100%</h2>
          <h2>100%</h2>
          <h2>100%</h2>
          <h2>100%</h2>
        </ul>
      </div>
      <h3>9999 Avaliações</h3>
      <h3>9999 Pedidos</h3>
    </div>
  );
};

export default ProductRate;