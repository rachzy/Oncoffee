import React, { useState, useRef, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import CallbackMessage from "./CallbackMessage";

import Axios from "axios";

import { ChangeClassesContext } from "../../Confirm";
import { GlobalServerContext } from "../../../App";

const InputArea = ({ emailInitialValue }) => {
  const [searchParams] = useSearchParams();

  const changeClass = useContext(ChangeClassesContext);
  const serverDetails = useContext(GlobalServerContext);

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(emailInitialValue);
  }, [emailInitialValue]);

  const [callbackMessageState, setCallbackMessageState] = useState({
    value: "",
    isError: false,
  });

  //Callback loading animation
  let toggleLoadingAnimation;
  let loadingState = 0;

  const startLoadingAnimation = () => {
    toggleLoadingAnimation = setInterval(() => {
      switch (loadingState) {
        case 0:
          loadingState++;
          setCallbackMessageState({
            value: "Aguarde",
            isError: false,
          });
          break;
        case 1:
          loadingState++;
          setCallbackMessageState({
            value: "Aguarde.",
            isError: false,
          });
          break;
        case 2:
          loadingState++;
          setCallbackMessageState({
            value: "Aguarde..",
            isError: false,
          });
          break;
        case 3:
          loadingState = 0;
          setCallbackMessageState({
            value: "Aguarde...",
            isError: false,
          });
          break;
        default:
          loadingState = 0;
      }
    }, 300);
  };

  const disableLoadingAnimation = () => {
    if (!toggleLoadingAnimation) return;
    clearInterval(toggleLoadingAnimation);
    setCallbackMessageState({
      value: "",
      isError: false,
    });
  };

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
        setCallbackMessageState({
          value: "Insira um email válido.",
          isError: true,
        });
        return (canContinue = false);
      }

      if (inputValue.length < 10 || inputValue.length > 50) {
        setCallbackMessageState({
          value: "O email deve ter de 10 à 50 caracteres",
          isError: true,
        });
        return (canContinue = false);
      }

      setCallbackMessageState({
        value: "",
        isError: false,
      });
    };
    validateInput();

    if (canContinue) {
      startLoadingAnimation();
      const [id, registerToken] = [
        searchParams.get("id"),
        searchParams.get("token"),
      ];

      const postNewEmail = async () => {
        try {
          const { data } = await Axios.post(
            `${serverDetails.serverUrl}/account/setverificationemail`,
            {
              userId: id,
              registerToken: registerToken,
              email: inputValue,
            },
          );

          disableLoadingAnimation();
          sendBtn.current.classList.remove("loading");

          if (data.isError) {
            switch (data.errorCode) {
              case "RATE_LIMIT":
                //"data.errno" will return the amount of milliseconds since when the last email was sent
                //dividing it by 1000 and subtracting it by 30 will result in the amount of remaining seconds
                //until "resend email" function will be available
                const remainingSeconds = Math.floor(
                  60 - parseInt(data.errno) / 1000
                );
                return setCallbackMessageState({
                  value: `Aguarde mais ${remainingSeconds} segundo(s) para executar essa ação novamente`,
                  isError: true,
                });
              case "EMAIL_ALREADY_IN_USE":
                return setCallbackMessageState({
                  value: "Este email já está em uso!",
                  isError: true,
                });
              default:
                return setCallbackMessageState({
                  value: `Ocorreu um erro ao registrar este email: ${data.errorCode}`,
                  isError: true,
                });
            }
          }

          switch (data.queryStatus) {
            case 200:
              changeClass("numberconfirm");
              break;
            default:
              return setCallbackMessageState({
                value:
                  "Ocorreu um erro desconhecido, por favor tente de novo mais tarde.",
                isError: true,
              });
          }
        } catch (err) {
          disableLoadingAnimation();
          sendBtn.current.classList.remove("loading");

          return setCallbackMessageState({
            value: `Ocorreu um erro interno do servidor: ${err}`,
            isError: true,
          });
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
        autoComplete="off"
        name="email"
        type="email"
        placeholder="exemplo@gmail.com"
        className="inputnumber"
        minLength="10"
        maxLength="50"
        onChange={handleChange}
        value={inputValue}
      />
      <CallbackMessage
        text={callbackMessageState.value}
        isError={callbackMessageState.isError}
      />
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
