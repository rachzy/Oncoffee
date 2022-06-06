import React from "react";

const MoredBox = ({title, description}) => {
  return (
    <div className="mored_box">
      <h2>{title}</h2>
      <h3>{description}</h3>
    </div>
  );
};

export default MoredBox;
