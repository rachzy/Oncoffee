import React, { useState, useRef, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Error from "./Error";

import Axios from "axios";

import { ChangeClassesContext } from "../../Confirm";
import { GlobalServerContext } from "../../../App";

const InputArea = ({ emailInitialValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  useEffect(() => {
    setInputValue(emailInitialValue);
  }, [emailInitialValue]);

  const changeClass = useContext(ChangeClassesContext);
  const serverDetails = useContext(GlobalServerContext);

  const [searchParams] = useSearchParams();

  const sendBtn = useRef(null);

  const handleButtonClick = () => {
    sendBtn.current.classList.add("loading");

    let canContinue = true;

    const validateInput = () => {
      const splitInputValueInSigns = inputValue.split("@");
      const splitInputValueInDots = inputValue.split(".");

      if (
        splitInputValueInSigns.length !== 2 ||
        splitInputValueInDots.length <= 1
      ) {
        setErrorValue("Insira um email válido.");
        return (canContinue = false);
      }

      if (inputValue.length < 10 || inputValue.length > 50) {
        setErrorValue("O email deve ter de 10 à 50 caracteres");
        return (canContinue = false);
      }

      setErrorValue("");
    };
    validateInput();

    if (canContinue) {
      const [id, registerToken] = [
        searchParams.get("id"),
        searchParams.get("token"),
      ];

      const postNewEmail = async () => {
        const query = await Axios.post(`${serverDetails.serverUrl}/setverificationemail`, {
          id: id,
          registerToken: registerToken,
        })
          .then(() => {
            sendBtn.current.classList.remove("loading");
          })
          .catch((err) => {
            return setErrorValue(`Ocorreu um erro interno do servidor: ${err}`);
          });

        console.log(query);

        const { data } = query;

        if (data.isError) {
          return setErrorValue(
            `Ocorreu um erro ao registrar esse email: ${data.errorCode}`
          );
        }

        if(data.queryStatus === 200) {
          changeClass("numberconfirm");
        }
      };
      return postNewEmail();
    }

    sendBtn.current.classList.remove("loading");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <>
      <input
        name="phonenumber"
        type="email"
        placeholder="exemplo@gmail.com"
        className="inputnumber"
        minLength="10"
        maxLength="50"
        onChange={handleChange}
        value={inputValue}
      />
      <Error text={errorValue} />
      <div className="enviarcenter">
        <input
          ref={sendBtn}
          onClick={handleButtonClick}
          type="button"
          value="Enviar"
          className="enviarbtt"
        />
      </div>
    </>
  );
};

export default InputArea;
