import React from "react";

const BackNext = ({currentPage}) => {
  return (
    <section className="back-next">
      <button>
        <i className="fas fa-chevron-left"></i>
      </button>
      <h2>{currentPage}</h2>
      <button>
        <i className="fas fa-chevron-right"></i>
      </button>
    </section>
  );
};

export default BackNext;
