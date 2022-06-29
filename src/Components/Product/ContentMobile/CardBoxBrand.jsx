import React, { useState, useRef, useEffect } from "react";

const CardBoxBrand = ({ productBrand }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const cardBox = useRef(null);

  useEffect(() => {
    if (cardBox && cardBox.current) {
      setIsLoaded(true);
    }

    if (isLoaded) {
      const getAllUlsInsideCardBox = cardBox.current.querySelectorAll("ul");
      getAllUlsInsideCardBox.forEach((ul) => {
        for (let i = 0; i <= 15; i++) {
          const newH4 = document.createElement("h4");
          newH4.innerText = productBrand;
          ul.appendChild(newH4);
        }
      });
    }
  }, [isLoaded, productBrand]);

  return (
    <div ref={cardBox} className="card_box_text2">
      <ul>
        <h4>{productBrand}</h4>
      </ul>
      <ul>
        <h4>{productBrand}</h4>
      </ul>
    </div>
  );
};

export default CardBoxBrand;
