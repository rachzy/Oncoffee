import React from "react";

const CommentText = ({ name, rate, description }) => {
  const returnStarsBasedOnRate = () => {
    if (isNaN(rate) || rate < 0 || rate > 5) return;
    for(let i = 0; i <= 5; i++) {
      console.log(i);
        if (i > rate - 1) {
          return <i className="fa fa-star" aria-hidden="true"></i>;
        }
        if (rate > i && rate < rate + 1) {
          return <i className="fa fa-star-half" aria-hidden="true"></i>;
        }
    }
  };
  return (
    <div className="coment_text">
      <h2>{name}</h2>
      <div className="coment_nota">
        {returnStarsBasedOnRate()}
        {/* <i className="fa fa-star-half" aria-hidden="true"></i> */}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default CommentText;
