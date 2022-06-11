import React, { useEffect, useState } from "react";
import BackNext from "./CommentOverflow/BackNext";

import CommentBox from "./CommentOverflow/CommentBox";
import CommentProfile from "./CommentOverflow/CommentProfile";
import CommentText from "./CommentOverflow/CommentText";

const CommentOverflow = ({ productComments }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const renderCommentsAccordingToCurrentPage = () => {
      let numberOfTheFirstCommentThatWillBeRendered = (currentPage - 1) * 5;
      let renderComments = [];
      for (
        let i = numberOfTheFirstCommentThatWillBeRendered;
        i <= numberOfTheFirstCommentThatWillBeRendered + 4;
        i++
      ) {
        renderComments.push(productComments[i]);
      }
      setComments(renderComments);
    };
    renderCommentsAccordingToCurrentPage();
  }, [currentPage, productComments]);

  return (
    <main className="coment_overflow">
      {comments.map((user) => {
        if (!user) return null;
        return (
          <CommentBox key={user.id}>
            <CommentProfile pfp={user.pfp} level={user.level} />
            <CommentText name={user.name} rate={user.rateGiven} />
          </CommentBox>
        );
      })}
      <BackNext
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        commentsArrayLength={productComments.length}
      />
    </main>
  );
};

export default CommentOverflow;
