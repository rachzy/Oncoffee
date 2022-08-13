import React, { useState, useRef, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Axios from "axios";

/*
TODO
-Keep developing resend email area

*/

import { GlobalServerContext } from "../../../App";

const InputsArea = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [userId, registerToken, nextPage] = [
    searchParams.get("id"),
    searchParams.get("token"),
    searchParams.get("next"),
  ];

  const sendBtn = useRef(null);
  const bttCenter = useRef(null);

  const { serverUrl, setUserSessionState, setIsLogged } =
    useContext(GlobalServerContext);

  const [inputValues, setInputValues] = useState([
    {
      id: 0,
      name: "digit0",
      value: "",
    },
    {
      id: 1,
      name: "digit1",
      value: "",
    },
    {
      id: 2,
      name: "digit2",
      value: "",
    },
    {
      id: 3,
      name: "digit3",
      value: "",
    },
    {
      id: 4,
      name: "digit4",
      value: "",
    },
    {
      id: 5,
      name: "digit5",
      value: "",
    },
  ]);

  const [bottomMessage, setBottomMessage] = useState({
    text: "",
    color: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();

    const { id, name, value } = e.target;

    const changeInputValuesState = async () => {
      let filterInputValues = inputValues.filter(
        (input) => input.id.toString() !== id.toString()
      );

      filterInputValues = [
        ...filterInputValues,
        {
          id: parseInt(id),
          name: name,
          value: value,
        },
      ];

      const sortInputValues = filterInputValues.sort((a, b) => {
        return a.id - b.id;
      });

      setInputValues(sortInputValues);
    };

    changeInputValuesState().then(() => {
      const nextAction = () => {
        if (value === "") return;

        if (parseInt(id) === inputValues.length - 1) {
          return sendBtn.current.click();
        }

        const nextInput = document.querySelector(`.digit${parseInt(id) + 1}`);
        nextInput.focus();
      };
      nextAction();
    });
  };

  const handlePaste = (e) => {
    const { id } = e.target;

    if (parseInt(id) !== 0) return;
    e.preventDefault();

    const eventClipboardData = e.clipboardData || window.ClipboardEvent;
    const clipboardData = eventClipboardData.getData("Text");

    if (!clipboardData || isNaN(parseInt(clipboardData))) return;

    const splitClipboardData = clipboardData.split("");
    let filterInputValues = inputValues.filter((input) => input.id > 0);

    for (let i = 0; i < filterInputValues.length; i++) {
      let filterArray = filterInputValues.filter((input) => input.id !== i);

      let newObject = {
        id: parseInt(i),
        name: `digit${i}`,
        value: "",
      };

      if (splitClipboardData[i]) {
        newObject.value = splitClipboardData[i];
      }

      filterInputValues = [...filterArray, newObject];
    }

    filterInputValues = filterInputValues.sort((a, b) => {
      return a.id - b.id;
    });

    setInputValues(filterInputValues);
  };

  const renderInputs = () => {
    return inputValues.map((input) => {
      return (
        <input
          key={input.id}
          autoComplete="off"
          name={input.name}
          type="text"
          id={input.id}
          className={`digit${input.id}`}
          maxLength="1"
          value={input.value}
          onChange={handleInputChange}
          onPaste={handlePaste}
        />
      );
    });
  };

  const handleResendCodeClick = () => {
    setBottomMessage({
      text: "Reenviando código...",
      color: "",
    });

    const resendEmail = async () => {
      Axios.post(`${serverUrl}/account/resendverificationemail`, {
        userId: userId,
        registerToken: registerToken,
      })
        .catch((err) => {
          setBottomMessage({
            text: `Ocorreu um erro ao tentar re-enviar o código: ${err}`,
            color: "rgb(251, 46, 46)",
          });
        })
        .then((response) => {
          const { data } = response;

          if (data.isError) {
            switch (data.errorCode) {
              case "RATE_LIMIT":
                //"data.errno" will return the amount of milliseconds since when the last email was sent
                //dividing it by 1000 and subtracting it by 30 will result in the amount of remaining seconds
                //until "resend email" function will be available
                const remainingSeconds = Math.floor(
                  60 - parseInt(data.errno) / 1000
                );
                return setBottomMessage({
                  text: `Aguarde mais ${remainingSeconds} segundo(s) para executar essa ação novamente`,
                  color: "rgb(251, 46, 46)",
                });
              default:
                return setBottomMessage({
                  text: `Ocorreu um erro ao tentar re-enviar o código: ${data.errorCode}`,
                  color: "rgb(251, 46, 46)",
                });
            }
          }

          if (data.queryStatus === 200) {
            setBottomMessage({
              text: "Código reenviado!",
              color: "rgb(0, 255, 0)",
            });
          }
        });
    };
    resendEmail();
  };

  const handleButtonClick = () => {
    bttCenter.current.classList.add("loading");

    setBottomMessage({
      text: "",
      color: "",
    });

    const getCodeInsertByTheUser = inputValues
      .reduce((previousValue, currentValue) => {
        return `${previousValue}${currentValue.value}`;
      }, 0)
      .replace(0, "");

    const validateCode = async () => {
      try {
        const { data } = await Axios.post(
          `${serverUrl}/account/verify`,
          {
            userId: userId,
            registerToken: registerToken,
            verificationCode: getCodeInsertByTheUser,
          },
          {
            withCredentials: true,
          }
        );

        if (data.isError) {
          bttCenter.current.classList.remove("loading");
          switch (data.errorCode) {
            case "ACCOUNT_NOT_FOUND":
              setBottomMessage({
                text: `Essa conta não foi encontrada`,
                color: "rgb(251, 46, 46)",
              });
              break;
            case "INVALID_CODE":
              setBottomMessage({
                text: `Código incorreto`,
                color: "rgb(251, 46, 46)",
              });
              break;
            case "ACCOUNT_ALREADY_VERIFIED":
              setBottomMessage({
                text: `Essa conta já foi confirmada`,
                color: "rgb(251, 46, 46)",
              });
              break;
            default:
              setBottomMessage({
                text: `Ocorreu um erro ao tentar confirmar essa conta: ${data.errorCode}`,
                color: "rgb(251, 46, 46)",
              });
          }
        }

        if (data.queryStatus === 200) {
          setUserSessionState(data.userData);
          setIsLogged(true);

          if (!nextPage) {
            return navigate("/");
          }

          navigate(`/${nextPage}`);
        }
      } catch (err) {
        bttCenter.current.classList.remove("loading");
        switch (err.response.status) {
          case 429:
            setBottomMessage({
              text: `Você fez várias tentativas, tente novamente mais tarde.`,
              color: "rgb(251, 46, 46)",
            });
            break;
          default:
            setBottomMessage({
              text: `Ocorreu um erro interno no servidor: ${err}`,
              color: "rgb(251, 46, 46)",
            });
        }
      }
    };

    validateCode();
  };

  return (
    <>
      <div className="inputstext">{renderInputs()}</div>

      <p style={{ textAlign: "center", color: bottomMessage.color }}>
        {bottomMessage.text}
      </p>

      <div ref={bttCenter} className="bttcenter">
        <input onClick={handleResendCodeClick} type="button" id="reenviar" />
        <label className="reenviar" htmlFor="reenviar">
          <p>Reenviar Código</p>
        </label>

        <input
          ref={sendBtn}
          onClick={handleButtonClick}
          type="button"
          value="Enviar"
        />
      </div>
    </>
  );
};

export default InputsArea;
