import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
} from "react";
import { useSearchParams } from "react-router-dom";

import Axios from "axios";

import "../css/Confirm.css";
import "../css/ConfirmResp.css";

import setPageTitle from "../globalFunctions/setPageTitle";
import ErrorColumn from "../Components/Confirm/ErrorColumn";
import Numbercolumn from "../Components/Confirm/Numbercolumn";
import Numberconfirm from "../Components/Confirm/Numberconfirm";

// import Textarea from "./Confirm/Textarea";

import { GlobalServerContext } from "../App";

export const ChangeClassesContext = createContext("");

const Confirm = ({ setHeaderPageTitle, pageTitle }) => {
  useEffect(() => {
    setPageTitle(pageTitle);
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);

  const loadingMessage = useRef(null);

  const getGlobalServerContext = useContext(GlobalServerContext);
  const [searchParams] = useSearchParams();

  //State that will control the class of each component
  const [mainClasses, setMainClasses] = useState({
    ErrorMessage: "errormessage",
    Numbercolumn: "numbercolum",
    Numberconfirm: "numberconfirm",
  });

  //Function that can easily handle a class change and display off the others
  const classDisplay = (className) => {
    loadingMessage.current.style.display = 'none';
    switch (className) {
      case "errormessage":
        setMainClasses({
          ErrorMessage: "errormessage active",
          Numbercolumn: "numbercolum",
          Numberconfirm: "numberconfirm",
        });
        break;
      case "numbercolumn":
        setMainClasses({
          ErrorMessage: "errormessage",
          Numbercolumn: "numbercolum active",
          Numberconfirm: "numberconfirm",
        });
        break;
      case "numberconfirm":
        setMainClasses({
          ErrorMessage: "errormessage",
          Numbercolumn: "numbercolum",
          Numberconfirm: "numberconfirm active",
        });
        break;
      default:
        setMainClasses({
          ErrorMessage: "errormessage",
          Numbercolumn: "numbercolum",
          Numberconfirm: "numberconfirm",
        });
    }
  };

  const [errorMessage, setErrorMessage] = useState();

  //Get URL params
  const [userId, registerToken] = [
    searchParams.get("id"),
    searchParams.get("token"),
  ];

  const [emailInitialValue, setEmailInitialValue] = useState("");

  useEffect(() => {
    const verifyIfSearchParamsAreValid = async () => {
      const validateParamsCon = await Axios.get(
        `${getGlobalServerContext.serverUrl}/account/register/validateparams/${userId}/${registerToken}`
      ).catch((err) => {
        return setErrorMessage(`Ocorreu um erro interno do servidor: ${err}`);
      });

      const { data } = validateParamsCon;

      if (data.isError) {
        switch (data.errorCode) {
          case "INVALID_PARAMS":
            setErrorMessage("Essa conta não foi encontrada.");
            break;
          case "ALREADY_VERIFIED":
            setErrorMessage("Essa conta já foi verificada.");
            break;
          default:
            setErrorMessage(
              `Desculpe, ocorreu um erro interno do servidor: ${data.errorCode}`
            );
        }
        return classDisplay("errormessage");
      }

      if (data.queryStatus === 200) {
        switch (data.email.isUsing) {
          case true:
            classDisplay("numberconfirm");
            setEmailInitialValue(data.email.email);
            break;
          default:
            classDisplay("numbercolumn");
        }
      }
    };
    verifyIfSearchParamsAreValid();
  }, [getGlobalServerContext.serverUrl, userId, registerToken]);

  return (
    <main className="conteudo-confirm">
      {/* <Textarea /> */}
      <main className="container-confirm">
        <ChangeClassesContext.Provider value={classDisplay}>
          <p ref={loadingMessage}>Carregando...</p>
          <ErrorColumn
            mainClassName={mainClasses.ErrorMessage}
            message={errorMessage}
          />
          <Numbercolumn
            emailInitialValue={emailInitialValue}
            mainClassName={mainClasses.Numbercolumn}
          />
          <Numberconfirm mainClassName={mainClasses.Numberconfirm} />
        </ChangeClassesContext.Provider>
      </main>
    </main>
  );
};

export default Confirm;
