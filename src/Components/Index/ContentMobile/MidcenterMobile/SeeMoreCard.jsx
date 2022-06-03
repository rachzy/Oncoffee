import React, { useState } from "react";

import displayError from "../../../../globalFunctions/displayErrors";

const SeeMoreCard = ({ renderDiv, returnMoreProductsFunction }) => {
  //All the products that will be rendered are inside this state
  const [products, setProducts] = useState();

  //State that determines which product will be the first one to be loaded in the next click (The default value is 6, cause the first product that will be loaded will always be the 6th one)
  const [startProductNumber, setStartProductNumber] = useState(6);

  //Determines the amount of columns that will be loaded per click
  const amountOfColumnsPerClick = 2;

  //Function that will be triggered when the user clicks in the button
  const handleClick = () => {
    if (startProductNumber > 78) {
      displayError(
        "",
        "",
        "Você já carregou o limite máximo de produtos por página!"
      );
      return;
    }
    const amountOfProductsThatWillBeLoaded = amountOfColumnsPerClick * 4;
    setProducts(
      returnMoreProductsFunction(
        startProductNumber + amountOfProductsThatWillBeLoaded
      )
    );
    setStartProductNumber(
      startProductNumber + amountOfProductsThatWillBeLoaded
    );
  };

  //Render Method (if renderDiv is true, render everything inside of a "midmobile-overflow" div. 
  //Else, just render the card by itself)
  const renderMethod = () => {
    if (renderDiv) {
      return (
        <div className="midmobile-overflow">
          <div onClick={handleClick} name="ver-mais" className="card-mobile2">
            <input type="button" style={{ display: "none" }} id="viewmorebtt" />
            <label htmlFor="viewmorebtt">
              <div className="cardmo-text2">
                <h2 style={{ fontSize: "20px" }}>Ver Mais</h2>
              </div>
              <i className="fas fa-plus"></i>
            </label>
          </div>
        </div>
      );
    }
    return (
      <div onClick={handleClick} name="ver-mais" className="card-mobile2">
        <input type="button" style={{ display: "none" }} id="viewmorebtt" />
        <label htmlFor="viewmorebtt">
          <div className="cardmo-text2">
            <h2 style={{ fontSize: "20px" }}>Ver Mais</h2>
          </div>
          <i className="fas fa-plus"></i>
        </label>
      </div>
    );
  };
  return (
    <>
      {products}
      {renderMethod()}
    </>
  );
};

export default SeeMoreCard;
