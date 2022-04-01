import React, { useState, useRef } from "react";
import Error from "./Error";

const InputArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const sendBtn = useRef(null);

  const handleButtonClick = () => {
    sendBtn.current.classList.add("loading");
    const validateInput = () => {
      //Remove every space, "+" and "-" from the string
      const extractOnlyNumbers = inputValue
        .replace(/\s/g, "")
        .replace("+", "")
        .replace("-", "");

      if (isNaN(extractOnlyNumbers)) {
        return setErrorValue(
          "O número inserido é inválido. Utilize apenas números e siga o formato: +XX XX XXXXXXXXXX"
        );
      }

      const splitInputValue = inputValue.split(" ");

      //Add "+" before the first value if it doesn't already have
      if (splitInputValue[0].charAt(0) !== "+") {
        splitInputValue[0] = `+${splitInputValue[0]}`;
        setInputValue(`+${inputValue}`);
      }

      //If the string is not separated exactly in 3 spaces
      if (splitInputValue.length !== 3) {
        return setErrorValue(
          "O formato do número deve seguir esse formato: +XX XX XXXXXXXXX"
        );
      }

      if (
        splitInputValue[0].length > 4 ||
        splitInputValue[1].length > 3 ||
        splitInputValue[2].length < 6 ||
        splitInputValue[2].length > 11
      )
        return setErrorValue(
          "O número inserido é inválido. Siga o formato: +XX XX XXXXXXXXXX"
        );

      return setErrorValue("");
    };
    validateInput();
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
        placeholder="+55 00 00000-0000"
        className="inputnumber"
        type="text"
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
