import React from "react";
import BackNext from "./CommentOverflow/BackNext";

import CommentBox from "./CommentOverflow/CommentBox";
import CommentProfile from "./CommentOverflow/CommentProfile";
import CommentText from "./CommentOverflow/CommentText";

const CommentOverflow = ({ currentPage, setCurrentPage, comments }) => {
  /* Sort function by not null elements */
  /* By: Bergi - Found in: https://stackoverflow.com/a/29829370/13575004 */
  const commentsSortedByNotNull = comments.sort((a, b) => {
    return !a - !b || +(a > b) || -(a < b);
  });

  const renderComments = () => {
    return commentsSortedByNotNull.map((comment) => {
      if (!comment) return null;
      let canRender = false;

      let firstCommentThatWillBeRendered = (currentPage - 1) * 5;

      //Render only 5 comments per page
      for (
        let i = firstCommentThatWillBeRendered;
        i <= firstCommentThatWillBeRendered + 4;
        i++
      ) {
        if (comment === comments[i]) canRender = true;
      }

      if (!canRender) return null;
      return (
        <CommentBox key={comment.id}>
          <CommentProfile pfp={comment.pfp} level={comment.level} />
          <CommentText name={comment.name} rate={comment.rateGiven} />
        </CommentBox>
      );
    });
  };

  return (
    <main className="coment_overflow">
      {renderComments()}
      <BackNext
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        comments={comments}
      />
    </main>
  );
};

export default CommentOverflow;
