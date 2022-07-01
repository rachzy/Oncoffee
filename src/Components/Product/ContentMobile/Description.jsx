import React, { useRef } from "react";
import DescBox from "./DescBox";

const Description = ({ productDetails, productDescription }) => {
  const [completeDesc, showMoreBtn, showLessBtn] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const renderDetails = () => {
    return productDetails.map((detail) => {
      return (
        <DescBox
          key={detail.id}
          title={detail.title}
          description={detail.description}
        />
      );
    });
  };

  const handleShowMoreButtonClick = () => {
    completeDesc.current.style.display = "flex";
    showMoreBtn.current.style.display = "none";
    showLessBtn.current.style.display = "flex";
  };

  const handleShowLessButtonClick = () => {
    completeDesc.current.style.display = "none";
    showMoreBtn.current.style.display = "flex";
    showLessBtn.current.style.display = "none";
  };
  return (
    <main className="mobile_desc">
      {renderDetails()}

      {/*  Mostrar a descriçao escrita */}
      <button
        ref={showMoreBtn}
        onClick={handleShowMoreButtonClick}
        className="mobile_desc_button"
      >
        Mais Informações
      </button>

      <div
        ref={completeDesc}
        style={{ display: "none" }}
        className="complete_desc"
      >
        <p>{productDescription}</p>
      </div>

      <button
        ref={showLessBtn}
        onClick={handleShowLessButtonClick}
        style={{ display: "none" }}
        className="mostrar_menos"
      >
        Mostrar Menos
      </button>
    </main>
  );
};

export default Description;
