import React, { useState, useRef } from "react";

import random from "../../../../globalFunctions/randomNumber";

import Input from "../../Input";
import Error from "../../Error";

const RegisterInputs = () => {
  const proxBtn = useRef(null);

  function initialInputDataStateValue() {
    return [
      {
        id: random(),
        name: "name",
        type: "text",
        placeholder: "Seu nome",
        minlength: 2,
        maxlength: 50,
        value: "",
        matchingInput: {
          enabled: false,
        },
        error: {
          enabled: false,
          text: "",
        },
      },
      {
        id: random(),
        name: "lastname",
        type: "text",
        placeholder: "Seu sobrenome",
        minlength: 2,
        maxlength: 50,
        value: "",
        matchingInput: {
          enabled: false,
        },
        error: {
          enabled: false,
          text: "",
        },
      },
      {
        id: random(),
        name: "email",
        type: "text",
        placeholder: "Email ou CPF",
        minlength: 10,
        maxlength: 50,
        value: "",
        matchingInput: {
          enabled: true,
          original: true,
          match: "confemail",
        },
        error: {
          enabled: false,
          text: "",
        },
      },
      {
        id: random(),
        name: "confemail",
        type: "text",
        placeholder: "Confirme seu Email ou CPF",
        minlength: 0,
        maxlength: 50,
        value: "",
        matchingInput: {
          enabled: true,
          original: false,
          match: "email",
        },
        error: {
          enabled: false,
          text: "",
        },
      },
      {
        id: random(),
        name: "password",
        type: "password",
        placeholder: "Sua senha",
        minlength: 5,
        value: "",
        matchingInput: {
          enabled: true,
          original: true,
          match: "confpassword",
        },
        error: {
          enabled: false,
          text: "",
        },
      },
      {
        id: random(),
        name: "confpassword",
        type: "password",
        placeholder: "Confirme sua senha",
        minlength: 0,
        value: "",
        matchingInput: {
          enabled: true,
          original: false,
          match: "password",
        },
        error: {
          enabled: false,
          text: "",
        },
      },
    ];
  }

  const [inputData, setInputData] = useState(initialInputDataStateValue());

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fetchInputs = inputData.map((input) => {
      if (input.name === name)
        return {
          ...input,
          value: value,
        };
      return input;
    });
    setInputData(fetchInputs);
  };

  const SetErrorObject = (errorType, name, enabled, text) => {
    let newInputData;

    if (errorType === "clear") {
      newInputData = inputData.map((input) => {
        if (input.name !== name) return input;
        return {
          ...input,
          error: {
            enabled: false,
            text: "",
          },
        };
      });
    }

    if (errorType === "length") {
      newInputData = inputData.map((input) => {
        if (input.name !== name) return input;

        let errorMessage;
        if (input.maxlength) {
          errorMessage = `Esse campo deve ter entre ${input.minlength} à ${input.maxlength} caracteres`;
        } else {
          errorMessage = `Esse campo deve ter pelo menos ${input.minlength} caracteres`;
        }
        if (input.value === "") {
          errorMessage = "Esse campo é obrigatório!";
        }

        return {
          ...input,
          error: {
            enabled: true,
            text: errorMessage,
          },
        };
      });
    }

    if (errorType === "matching") {
      newInputData = inputData.map((input) => {
        if (input.name !== name) return input;
        return {
          ...input,
          error: {
            enabled: true,
            text: "Os valores não são os mesmos",
          },
        };
      });
    }

    if (errorType === "custom") {
      newInputData = inputData.map((input) => {
        if (input.name !== name) return input;
        return {
          ...input,
          error: {
            enabled: true,
            text: text,
          },
        };
      });
    }
    setInputData(newInputData);
  };

  const verifyLength = (name) => {
    inputData.map((input) => {
      if (input.name !== name) return null;
      const valueLength = input.value.length;
      if (valueLength < input.minlength || valueLength > input.maxlength)
        return SetErrorObject("length", name);
      return SetErrorObject("clear", name);
    });
  };

  const verifyMatching = (name) => {
    const getInput = inputData.filter((input) => input.name === name)[0];
    if (!getInput.matchingInput.enabled) return false;

    const matchInputName = getInput.matchingInput.match;
    const getMatchInput = inputData.filter(
      (input) => input.name === matchInputName
    )[0];

    let originalInput;
    let verifyingInput;
    if(getMatchInput.matchingInput.original) {
      originalInput = getMatchInput;
      verifyingInput = getInput;
    } else {
      originalInput = getInput;
      verifyingInput = getMatchInput;
    }

    if(originalInput.value !== verifyingInput.value) {
      SetErrorObject("matching", verifyingInput.name);
      if(getInput === verifyingInput) return true;
    }
    return false;
  };

  const validateErrors = (name) => {
    SetErrorObject("clear", name);
    verifyLength(name);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validateErrors(name);
  };

  const displayInputs = () => {
    return inputData.map((input) => {
      return (
        <div key={input.id}>
          <Input
            key={`${input.id}-input`}
            name={input.name}
            id={input.name}
            placeholder={input.placeholder}
            minLength={input.minlength}
            maxLength={input.maxlength}
            type={input.type}
            className="logmail"
            onChange={handleChange}
            onBlur={handleBlur}
            value={input.value}
          />

          <Error key={`${input.id}-error`} text={input.error.text} />
        </div>
      );
    });
  };

  const handleButtonClick = () => {
    proxBtn.current.classList.add("clicked");

    let canContinue = true;

    const newInputData = inputData.map((input) => {
      if (input.value || input.value !== "") return input;
      canContinue = false;
      return {
        ...input,
        error: {
          enabled: true,
          text: "Esse campo é obrigatório!",
        },
      };
    });
    setInputData(newInputData);

    inputData.forEach((input) => {
      if (input.error.enabled) return (canContinue = false);
      if(input.matchingInput.enabled) verifyMatching(input.name);
    });

    if (canContinue) alert("Valid login!");
    proxBtn.current.classList.remove("clicked");
  };

  return (
    <>
      {displayInputs()}
      <input
        ref={proxBtn}
        onClick={handleButtonClick}
        type="button"
        value="Próximo"
        className="proxbtt"
      />
    </>
  );
};

export default RegisterInputs;
