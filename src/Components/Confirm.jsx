import React, {useEffect, useRef, useState} from "react";

import '../css/Confirm.css';
import '../css/ConfirmResp.css';

import setPageTitle from "../globalFunctions/setPageTitle";
import Numbercolumn from "./Confirm/Numbercolumn";
import Numberconfirm from "./Confirm/Numberconfirm";

import Textarea from "./Confirm/Textarea";

const Confirm = ({ setHeaderPageTitle, pageTitle }) => {
  useEffect(() => {
    setPageTitle(pageTitle);
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);

  const [mainClasses, setMainClasses] = useState({
    Numbercolumn: "numbercolum active",
    Numberconfirm: "numberconfirm"
  })

  return (
    <main className="conteudo-confirm">
      <Textarea />
      <main className="container-confirm">
        <Numbercolumn mainClassName={mainClasses.Numbercolumn} />
        <Numberconfirm mainClassName={mainClasses.Numberconfirm} />        
      </main>
    </main>
  );
};

export default Confirm;
