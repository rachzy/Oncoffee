import React from "react";

const ProductDesc = ({ title, description }) => {
  return (
    <main className="product_desc">
      <div className="desc">
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </main>
  );
};

export default ProductDesc;
