import React from "react";

import GoBack from "./Numberconfirm/GoBack";
import TitleDescription from "./Numberconfirm/TitleDescription";
import InputsArea from "./Numberconfirm/InputsArea";

const Numberconfirm = ({mainClassName}) => {
  document.body.style.overflowY = 'hidden';
  return (
    <main className={mainClassName}>
      <GoBack />
      <TitleDescription />
      <InputsArea />
    </main>
  );
};

export default Numberconfirm;
