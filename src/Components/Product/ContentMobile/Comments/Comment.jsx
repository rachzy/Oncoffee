import React from "react";

const Comment = ({title, description, rate, pfp, level}) => {
    const returnStarsBasedOnRate = () => {
        if (isNaN(rate) || rate < 0 || rate > 5) return;
        //Since for and while loops weren't working with returns, I had to code this in a different and dirty way
    
        let rateNumbers = []; //Array that will save each number from 0 to user's rate number, 1 by 1
    
        for (let i = 0; i <= rate; i++) {
          //Check if next number is not integer
          if (i < rate && i + 1 > rate) {
            rateNumbers.push(i + 0.5); //If it is, sum 0.5 to it to mark it as a not integer number
          } else {
            rateNumbers.push(i);
          }
        }
    
        return rateNumbers.map((number) => {
          if (number === 0) return null;
    
          if (Number.isInteger(number)) {
            return <i key={number} className="fa fa-star" aria-hidden="true"></i>; //Return the full star if the number is integer
          }
    
          //If the number is not integer
          return (
            <div style={{display: "inline-block"}} key={number}>
              {/* Return the full star by itself */}
              <i className="fa fa-star" aria-hidden="true" />
    
              {/* Return a half star to represent the 0.5 */}
              <i className="fa fa-star-half" aria-hidden="true" />
            </div>
          );
        });
      };
  return (
    <div className="best_comment">
      <div className="comment_left">
        <img src={require(`../../../../imgs/${pfp}`)} alt="" />
        <h3>{level}</h3>
        <h4>Nivel</h4>
      </div>
      <div className="comment_right">
        <div className="mobile_stars_area">
            {returnStarsBasedOnRate()}
        </div>
        <h2>{title}</h2>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Comment;
