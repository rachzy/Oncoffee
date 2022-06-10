import React from "react";
import BackNext from "./CommentOverflow/BackNext";

import CommentBox from "./CommentOverflow/CommentBox";
import CommentProfile from "./CommentOverflow/CommentProfile";
import CommentText from "./CommentOverflow/CommentText";

const CommentOverflow = ({ productComments }) => {
  return (
    <main className="coment_overflow">
      {productComments.map((user) => {
        return (
          <CommentBox key={user.id}>
            <CommentProfile pfp={user.pfp} level={user.level} />
            <CommentText name={user.name} rate={user.rateGiven} />
          </CommentBox>
        );
      })}
      <BackNext currentPage={1} />
    </main>
  );
};

export default CommentOverflow;
