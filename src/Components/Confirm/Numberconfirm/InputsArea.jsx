import React, { useState, useRef } from "react";

const InputsArea = () => {
  const sendBtn = useRef(null);
  const bttCenter = useRef(null);

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
    const { id, name, value } = e.target;

    const changeInputValuesState = () => {
      let filterInputValues = inputValues.filter(
        (input) => input.id.toString() !== id.toString()
      );

      filterInputValues = [
        ...filterInputValues,
        {
          id: id,
          name: name,
          value: value,
        },
      ];

      const sortInputValues = filterInputValues.sort((a, b) => {
        return a.id - b.id;
      });

      setInputValues(sortInputValues);
    };
    changeInputValuesState();

    const nextAction = () => {
      if (value === "") return;

      if (parseInt(id) === inputValues.length - 1) {
        return sendBtn.current.click();
      }

      const nextInput = document.querySelector(`.digit${parseInt(id) + 1}`);
      nextInput.focus();
    };
    nextAction();
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
        />
      );
    });
  };

  const handleResendCodeClick = () => {
    setBottomMessage({
      text: "Código reenviado!",
      color: "green",
    });
  };

  const handleButtonClick = () => {
    bttCenter.current.classList.add("loading");

    setBottomMessage({
      text: "O código inserido é invalido",
      color: "rgb(161, 46, 46)",
    });
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
