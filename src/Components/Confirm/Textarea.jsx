import React, { useRef } from "react";

const Textarea = () => {
  const textarea = useRef(null);

  if (textarea.current) {
    for (let i = 0; i <= 50; i++) {
      const newP = document.createElement("p");
      newP.innerText = "OnCoffee";
      textarea.current.appendChild(newP);
    }
  }

  return <main ref={textarea} className="textarea"></main>;
};

export default Textarea;
