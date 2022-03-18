import React from "react";

const GoBackIcon = ({onClick}) => {
  return (
    <label onClick={onClick} htmlFor="backbtt">
      <i className="fas fa-angle-left"></i>
    </label>
  );
};

export default GoBackIcon;
