import React, { useState } from "react";

const InputArea = () => {
  function initialState() {
    return { phonenumber: "" };
  }

  const [inputValues, setInputValues] = useState(initialState());

  const handleButtonClick = () => {
    const separateStringInSpaces = () => {
      const splitStringInSpaces = inputValues.phonenumber.split(" ");
      switch (splitStringInSpaces.length) {
        case 3:
          break;
        default:
          let finalValue;
          const validateFirstValue = () => {
            let firstValue = splitStringInSpaces[0];
            if (firstValue.charAt(0) !== "+") firstValue = `+${firstValue}`;

            if (firstValue.length !== 4) {
              const sliceFirst3Chars = firstValue.substring(0, 3);
              const sliceRemainingChars = firstValue.substring(
                3,
                firstValue.length
              );
              firstValue = [sliceFirst3Chars, sliceRemainingChars];
            }

            if(firstValue[0]) {
                splitStringInSpaces = [
                    ...firstValue,
                    ...splitStringInSpaces
                ]
            } else {
                splitStringInSpaces[0] = firstValue;
            }

            return (finalValue = firstValue);
          };
          validateFirstValue();

          const validateSecondValue = () => {
              console.log(splitStringInSpaces);
            let secondValue = splitStringInSpaces[1];

            if (secondValue.length !== 2) {
              const sliceFirst2Chars = secondValue.slice(0, 2);
              const sliceRemainingChars = secondValue.slice(
                2,
                secondValue.length
              );
              secondValue = `${sliceFirst2Chars} ${sliceRemainingChars}`;
            }
            return (finalValue += secondValue);
          };
          validateSecondValue();

          console.log(finalValue);
      }
    };
    separateStringInSpaces();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      [name]: value,
    });
  };

  return (
    <>
      <input
        name="phonenumber"
        placeholder="+55 (00) 0 0000-0000"
        className="inputnumber"
        type="text"
        onChange={handleChange}
        value={inputValues.phonenumber}
      />
      <div className="enviarcenter">
        <input
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
