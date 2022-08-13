import React, { useState } from "react";

import displayError from "../../../../globalFunctions/displayErrors";

const BottomBtn = ({ returnMoreProductsFunction, children }) => {
  //State that determines which product will be the first one to be loaded in the next click (The default value is 6, cause the first product that will be loaded will always be the 6th one)
  const [startProductNumber, setStartProductNumber] = useState(1);

  //Determines the amount of columns that will be loaded per click
  const amountOfColumnsPerClick = 2;

  //Function that will be triggered when the user clicks in the button
  const handleClick = () => {
    if (startProductNumber > 78) {
      return displayError(
        "",
        "",
        "Você já carregou o limite máximo de produtos por página!"
      );
    }
    const amountOfProductsThatWillBeLoaded = amountOfColumnsPerClick * 4;

    returnMoreProductsFunction(
      startProductNumber + amountOfProductsThatWillBeLoaded
    );
    setStartProductNumber(
      startProductNumber + amountOfProductsThatWillBeLoaded
    );
  };
  return (
    <button onClick={handleClick} className="load_more">
      {children}
    </button>
  );
};

export default BottomBtn;
