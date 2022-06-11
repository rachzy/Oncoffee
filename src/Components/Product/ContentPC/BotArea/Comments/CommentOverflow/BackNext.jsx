import React from "react";

const BackNext = ({
  currentPage,
  setCurrentPage,
  commentsArrayLength
}) => {
  const handlePreviousButtonClick = () => {
    if(currentPage <= 1) return;
    setCurrentPage(currentState => currentState - 1);
  }

  const handleNextButtonClick = () => {
    if(currentPage * 5 >= commentsArrayLength) return;
    setCurrentPage(currentState => currentState + 1);
  }

  return (
    <section className="back-next">
      <button onClick={handlePreviousButtonClick}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <h2>{currentPage}</h2>
      <button onClick={handleNextButtonClick}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </section>
  );
};

export default BackNext;
