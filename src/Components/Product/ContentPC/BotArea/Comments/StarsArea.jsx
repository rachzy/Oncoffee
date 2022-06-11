import React from "react";

const StarsArea = ({ handleStarClick }) => {
  return (
    <div className="stars_area">
      <button className="star_box" onClick={handleStarClick} value={5}>
        5 Estrelas
      </button>
      <button className="star_box" onClick={handleStarClick} value={4}>
        4 Estrelas
      </button>
      <button className="star_box" onClick={handleStarClick} value={3}>
        3 Estrelas
      </button>
      <button className="star_box" onClick={handleStarClick} value={2}>
        2 Estrelas
      </button>
      <button className="star_box" onClick={handleStarClick} value={1}>
        1 Estrelas
      </button>
    </div>
  );
};

export default StarsArea;
