import React from "react";

import "../../css/Extra.css";

const Error = () => {
  let errorDiv = document.querySelector(".error-popup");

  const closeErrorDiv = () => {
    if (!errorDiv) {
      errorDiv = document.querySelector(".error-popup");
    }
    errorDiv.classList.remove("error-active");
  };
  return (
    <div className="error-popup">
      <p id="error-text"></p>
      <i onClick={closeErrorDiv} className="fas fa-times"></i>
    </div>
  );
};

export default Error;
