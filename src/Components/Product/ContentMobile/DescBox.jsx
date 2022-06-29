import React from "react";

const DescBox = ({ title, description }) => {
  return (
    <div className="mobile_desc_box">
      <h2>{title}</h2>
      <h3>{description}</h3>
    </div>
  );
};

export default DescBox;
