import React from "react";
import { Fragment } from "react/cjs/react.production.min";

import FilterItem from "../FilterItem";
import FilterMethod from "../FilterMethod";

const SearchFilteringMethods = ({ filteringMethods, handleItemClick }) => {
  return (
    <Fragment>
      {filteringMethods.map((filterMethod) => {
        return (
          <FilterMethod key={filterMethod.title} title={filterMethod.title}>
            {filterMethod.items.map((item) => {
              return (
                <FilterItem
                  key={item.title}
                  itemTitle={item.title}
                  itemId={item.id}
                  itemSelected={item.selected}
                  methodType={filterMethod.id}
                  handleItemClick={handleItemClick}
                />
              );
            })}
          </FilterMethod>
        );
      })}
      <FilterMethod title="Preço">
        <div className="inputs_price">
          <input type="text" placeholder="Min." className="input_price" />
          <input type="text" placeholder="Max." className="input_price" />
        </div>
        <input type="button" className="aplicar" value="Aplicar" />
      </FilterMethod>
    </Fragment>
  );
};

export default SearchFilteringMethods;
