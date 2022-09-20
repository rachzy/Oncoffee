import React from "react";
import { Fragment } from "react/cjs/react.production.min";

const FilterItem = ({ methodTitle }) => {
  return (
    <Fragment>
      <input type="checkbox" className="check_metodo" id={methodTitle} />
      <label id={methodTitle} htmlFor={methodTitle}>
        <h3>
          <div>{methodTitle}</div>
        </h3>
      </label>
    </Fragment>
  );
};

export default FilterItem;
