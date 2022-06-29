import React, { useState } from "react";
import { useEffect } from "react";

const BackNext = ({ currentPage, setCurrentPage, comments }) => {
  //State that control the total length of comments that the program will read
  const [commentsArrayLength, setCommentsArrayLength] = useState(0);

  useEffect(() => {
    const checkIfEachCommentIsNull = () => {
      let amountOfCommentsThatAreNotNuLL = 0;

      //Map function that will discriminate null elements and add +1 to "amountOfCommentsThatAreNotNull"
      //if the element is valid
      comments.forEach((comment) => {
        if (!comment) return;
        amountOfCommentsThatAreNotNuLL++;
      });

      setCommentsArrayLength(amountOfCommentsThatAreNotNuLL);
    };
    checkIfEachCommentIsNull();
  }, [comments]);
  
  const handlePreviousButtonClick = () => {
    if (currentPage <= 1) return;
    setCurrentPage((currentState) => currentState - 1);
  };

  const handleNextButtonClick = () => {
    if (currentPage * 5 >= commentsArrayLength) return;
    setCurrentPage((currentState) => currentState + 1);
  };

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
