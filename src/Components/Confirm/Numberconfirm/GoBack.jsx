import React, { useContext } from "react";

import { ChangeClassesContext } from "../../Confirm";

const GoBack = () => {
    const changeClass = useContext(ChangeClassesContext);
  return (
    <>
      <label>
        <i onClick={() => changeClass("numbercolumn")} className="fas fa-angle-left"></i>
      </label>
    </>
  );
};

export default GoBack;
