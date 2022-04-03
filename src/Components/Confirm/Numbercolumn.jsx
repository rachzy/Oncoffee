import React from "react";

import GoBackIcon from "./GoBackIcon";
import ContentText from "./Numbercolumn/ContentText";
import InputArea from "./Numbercolumn/InputArea";

const Numbercolumn = ({mainClassName, emailInitialValue}) => {
  return (
    <main className={mainClassName}>
      <input type="button" name="" id="backbtt" />
      <GoBackIcon />
      <ContentText />
      <InputArea emailInitialValue={emailInitialValue} />
    </main>
  );
};

export default Numbercolumn;
