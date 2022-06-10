import React from "react";

const MoreImgs = ({ productImages }) => {
  return (
    <main className="more_imgs">
      {productImages.map((productImage) => {
        return (
          <img
            key={productImage.src}
            src={require(`../../../../imgs/${productImage.src}`)}
            alt={productImage.alt}
          />
        );
      })}
    </main>
  );
};

export default MoreImgs;
