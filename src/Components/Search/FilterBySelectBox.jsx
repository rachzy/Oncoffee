import React, { useEffect, useState } from "react";

const FilterBySelectBox = ({ setProducts }) => {
  //FilterBy State
  const [filterByValue, setFilterByValue] = useState("MOST_SOLD");

  //State that will look for the current filter value and filter all the products according to the selected method
  useEffect(() => {
    setProducts((currentProducts) => {
      if (currentProducts.length === 0) return [];
      if (filterByValue === "MOST_SOLD") {
        return []
          .concat(currentProducts)
          .sort((a, b) =>
            parseInt(a.productTotalOrders) > parseInt(b.productTotalOrders)
              ? -1
              : 1
          );
      }

      if (filterByValue === "CHEAPEST") {
        return []
          .concat(currentProducts)
          .sort((a, b) =>
            parseInt(a.productPrice.finalPrice) <
            parseInt(b.productPrice.finalPrice)
              ? -1
              : 1
          );
      }

      if (filterByValue === "MOST_EXPENSIVE") {
        return []
          .concat(currentProducts)
          .sort((a, b) =>
            parseInt(a.productPrice.finalPrice) >
            parseInt(b.productPrice.finalPrice)
              ? -1
              : 1
          );
      }

      if (filterByValue === "BEST_RATING") {
        return []
          .concat(currentProducts)
          .sort((a, b) =>
            parseInt(a.productRate.finalRate) >
            parseInt(b.productRate.finalRate)
              ? -1
              : 1
          );
      }

      return currentProducts;
    });
  }, [filterByValue, setProducts]);

  //Function that will be triggered when the user selects another filter method
  const handleFilterByChange = (selectedValue) => {
    const { value } = selectedValue.target;
    setFilterByValue(value);
  };
  return (
    <div className="SelectBox">
      <select onChange={handleFilterByChange.bind(this)}>
        <option value="MOST_SOLD">Mais Comprado</option>
        <option value="CHEAPEST">Mais Barato</option>
        <option value="MOST_EXPENSIVE">Mais Caro</option>
        <option value="BEST_RATING">Melhor Avaliação</option>
      </select>
      <div className="chevron">
        <i className="fas fa-sort-down"></i>
      </div>
    </div>
  );
};

export default FilterBySelectBox;
