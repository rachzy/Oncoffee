import React from "react";
import { Fragment } from "react/cjs/react.production.min";

const FilterItem = ({
  itemTitle,
  itemId,
  itemSelected,
  methodType,
  handleItemClick,
}) => {
  return (
    <Fragment>
      <label
        className={`method_box ${itemSelected || "checked"}`}
        onClick={handleItemClick.bind(this, itemId, methodType)}
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
