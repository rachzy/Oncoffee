import React, { useState } from "react";

import CommentOverflow from "./Comments/CommentOverflow";
import StarsArea from "./Comments/StarsArea";
import TopComment from "./Comments/TopComment";

const Comments = ({ productRate, productComments }) => {
  const [comments, setComments] = useState(productComments);
  const [currentPage, setCurrentPage] = useState(1);

  const orderCommentsByStars = (e) => {
    let { value } = e.target;
    value = parseInt(value);

    const filterCommentsByStar = productComments.map((comment) => {
      if (Math.floor(comment.rateGiven) !== value) return null;
      return comment;
    });
    setComments(filterCommentsByStar);
    setCurrentPage(1);
  };

  return (
    <main className="comentarios">
      <TopComment rate={productRate} />
      <StarsArea handleStarClick={orderCommentsByStars} />
      <CommentOverflow
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        comments={comments}
      />
    </main>
  );
};

export default Comments;
