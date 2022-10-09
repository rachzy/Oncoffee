import React from "react";
import { Fragment } from "react/cjs/react.production.min";

const FilterItem = ({
  itemTitle,
  itemSelected,
  methodType,
  handleItemClick,
}) => {
  return (
    <Fragment>
      <label
        className={`method_box ${itemSelected || "checked"}`}
        onClick={handleItemClick.bind(this, itemTitle, methodType)}
        htmlFor={itemTitle}
      >
        <h3>
          <div>{itemTitle}</div>
        </h3>
      </label>
    </Fragment>
  );
};

export default FilterItem;
