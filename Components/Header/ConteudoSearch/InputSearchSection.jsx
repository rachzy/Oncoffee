import React from "react";

import NewSearchIcon from "../../../imgs/newsearch.png";

const InputSearchSection = ({ children, className }) => {
  return (
    <div className={className}>
      <img src={NewSearchIcon} alt="new-search-icon" />
      {children}
    </div>
  );
};

export default InputSearchSection;
