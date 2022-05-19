import React from "react";

import "../../../css/extra.css";

const CallbackMessage = ({ id, isError, text }) => {
  const returnSpanClassName = () => {
    if (isError) return "error-msg";
    return "callback-msg";
  };

  return (
    <p id={`error-${id}`} style={{ textAlign: "center" }}>
      <span className={returnSpanClassName()}>{text}</span>
    </p>
  );
};

export default CallbackMessage;
