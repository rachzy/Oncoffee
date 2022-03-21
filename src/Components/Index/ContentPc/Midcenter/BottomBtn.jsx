import React, { useState } from 'react';

import displayError from '../../../../globalFunctions/displayErrors';

const BottomBtn = ({returnMoreProductsFunction, children}) => {
    //All the products that will be rendered are inside this state
    const [products, setProducts] = useState();

    //State that determines which product will be the first one to be loaded in the next click (The default value is 6, cause the first product that will be loaded will always be the 6th one)
    const [startProductNumber, setStartProductNumber] = useState(6);

    //Determines the amount of columns that will be loaded per click
    const amountOfColumnsPerClick = 2;

    //Function that will be triggered when the user clicks in the button
    const handleClick = () => {
        if(startProductNumber > 78) {
            displayError('', '', 'Você já carregou o limite máximo de produtos por página!');
            return;
        }
        const amountOfProductsThatWillBeLoaded = amountOfColumnsPerClick * 4;
        setProducts(returnMoreProductsFunction(startProductNumber + amountOfProductsThatWillBeLoaded));
        setStartProductNumber((startProductNumber + amountOfProductsThatWillBeLoaded));
    }
    return (
        <>
            {products}
            <button onClick={handleClick} className="load_more">{children}</button>
        </>
    );
}
 
export default BottomBtn;