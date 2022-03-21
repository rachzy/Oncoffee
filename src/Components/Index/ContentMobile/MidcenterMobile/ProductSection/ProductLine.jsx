import React from "react";

const ProductLine = ({ title, category, children }) => {
  return (
    <main className="midmobile" id={category}>
      <h2>{title}</h2>
      <div className="midmobile-overflow">{children}</div>
    </main>
  );
};

export default ProductLine;
