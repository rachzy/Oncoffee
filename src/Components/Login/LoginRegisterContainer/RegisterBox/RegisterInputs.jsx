import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Axios from "axios";

import random from "../../../../globalFunctions/randomNumber";

import Input from "../../Input";
import Error from "../../Error";

const RegisterInputs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //Import serverURL
  const { serverUrl } = require("../../../../connection.json");

  const proxBtn = useRef(null);

  //All the inputs and their data are set in this function

  //Options Guide:
  //Id: the unique id that React will use as key (just set it as random())
  //Name: the input name, it's the main identifier of the input
  //Type: the input type (text, password, email)
  //Placeholder: the input placeholder
  //Minlength: the input min char length
  //Maxlength (optional): the input max char length
  //value: corresponds to the input value that will be modified when any change in that input happens
  //Matching input: It's used for inputs that needs to have their values confirmed by a confirmation or that is a confirmation input by itself
  //{
  //enabled: boolean, it will basically determine if that input is a matching input or not
  //original: boolean, determines if the input is a confirmation input or not If it's set as false, then it's not.
  //match: the name of the input that that input is matching with (IT NEEDS TO BE THE EXACT SAME NAME TO WORK)
  //}
  //error: it determines if there's an error in that input and the text of it
  //{
  //enabled: boolean,it determines if there's an error or not and if it will block the user's register
  //text: the error text that will be displayed
  //}
  function initialInputDataStateValue() {
    return [
      {
        id: random(),
        name: "name",
        type: "text",
        placeholder: "Seu nome",
        minlength: 2,
        maxlength: 50,
        required: true,
        value: "",
        matchingInput: {
          enabled: false,
        },
        error: {
          enabled: false,
          text: "",
        },
        isLastInput: false,
      },
      {
        id: random(),
        name: "lastname",
        type: "text",
        placeholder: "Seu sobrenome",
        minlength: 2,
        maxlength: 50,
        required: true,
        value: "",
        matchingInput: {
          enabled: false,
        },
        error: {
          enabled: false,
          text: "",
        },
        isLastInput: false,
      },
      {
        id: random(),
        name: "email",
        type: "text",
        placeholder: "Email ou CPF",
        minlength: 10,
        maxlength: 50,
        required: true,
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
        isLastInput: false,
      },
      {
        id: random(),
        name: "confemail",
        type: "text",
        placeholder: "Confirme seu Email ou CPF",
        minlength: 0,
        maxlength: 50,
        required: true,
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
        isLastInput: false,
      },
      {
        id: random(),
        name: "password",
        type: "password",
        placeholder: "Sua senha",
        minlength: 5,
        required: true,
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
        isLastInput: false,
      },
      {
        id: random(),
        name: "confpassword",
        type: "password",
        placeholder: "Confirme sua senha",
        minlength: 0,
        required: true,
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
        isLastInput: true,
      },
    ];
  }

  //State that receive and controls every input data
  const [inputData, setInputData] = useState(initialInputDataStateValue());

  //State that controls the "main error" that it's displayed right under the "next" button
  const [mainErrorValue, setMainErrorValue] = useState("");

  //Function that will display every input according to it data
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
            form="register"
            isLastInput={input.isLastInput}
          />

          <Error key={`${input.id}-error`} text={input.error.text} />
        </div>
      );
    });
  };

  //Simple handle change function for handling input changes
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

  //Function that sets input errors inside of the state
  //Params guide
  //errorType: determines what kind of error it is and how it gonna be handled by the function.
  //It values can be: "clear", "length", "matching", "emailcpf" and "custom" (set as default)
  //name: the name of the input where the error will be modified
  //text: the error text that will be set (for custom errors)
  //enabled: boolean, it determines the "enabled" option value of the error
  const SetErrorObject = (errorType, name, text, enabled) => {
    let newInputData;

    switch (errorType) {
      //Basically clear that input error, setting the text to null and toggling off the "enabled" option
      case "clear":
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
        break;

      //Case error for problems related to the input value length (exceeding max-characters length, etc)
      case "length":
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
        break;

      //Case error for inputs whose values don't match
      case "matching":
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
        break;

      //Case for invalid email or CPF
      case "emailcpf":
        newInputData = inputData.map((input) => {
          if (input.name !== "email") return input;
          return {
            ...input,
            error: {
              enabled: true,
              text: "O valor inserido não é um email ou CPF válido",
            },
          };
        });
        break;

      //For custom errors
      //Both "enabled" and "text" parameters are necessary for this case
      default:
        newInputData = inputData.map((input) => {
          if (input.name !== name) return input;
          return {
            ...input,
            error: {
              enabled: enabled,
              text: text,
            },
          };
        });
        break;
    }

    setInputData(newInputData);
  };

  //Function to check if a specific input value meets the minimum and maximum length set in that input
  const verifyLength = (name) => {
    inputData.map((input) => {
      if (input.name !== name) return null;

      const valueLength = input.value.length;

      if (valueLength < input.minlength || valueLength > input.maxlength)
        return SetErrorObject("length", name);

      //Clear the input's error, since the value length is valid
      return SetErrorObject("clear", name);
    });
  };

  //Function to check if a specific input value is considered valid or not
  const verifyValue = (name) => {
    switch (name) {
      //The "email" input needs to be either an email or a "CPF", and that's what the program will check
      case "email":
        //NOTES:
        //For a value to be considered an email, it needs to have one "@" and at least one "."
        //Ex: example@gmail.com
        //For a value to be considered a CPF, it needs to have only and exactly 11 numbers, and it can optionally have a "-" behind the last two numbers
        //Ex: 11122233344 || 111222333-44
        inputData.map((input) => {
          if (input.name !== "email") return null;

          const checkIfValueHasAtSign = input.value.split("@"); //Split the string in "@"
          const checkIfValueHasDot = input.value.split("."); //Split the string in "."

          if (
            checkIfValueHasAtSign.length === 2 && //If there are 2 objects, then there's a "@"
            checkIfValueHasDot.length > 1 //If there are more than one object, then there's at least one "."
          )
            return null; //Return since the value is a valid email

          const checkIfValueHasScore = input.value.split("-"); //Split the string in "-", since CPFs have a "-"
          //But having a "-" is not a requirement to make the program read the value as a CPF

          //Even if there are no "-", the value can still be a CPF, and that's what the program will check
          if (checkIfValueHasScore.length === 1) {
            if (isNaN(input.value) || input.value.length !== 11)
              //If the value is not a number or if it doesn't have exactly 11 characters, then it's definitely not a CPF
              return SetErrorObject("emailcpf");
            return null; //If it does, then it's a valid CPF, so return
          }

          //If the Array length is 2, than the user in fact insert a "-" in the input value
          if (checkIfValueHasScore.length === 2) {
            const cutScore = input.value.replace("-", "");
            if (isNaN(cutScore)) {
              return SetErrorObject("emailcpf");
            }
            return null; //If every condition returned as false, then the cpf is valid
          }

          //If the Array length is more than 2, then the CPF is not valid
          if (checkIfValueHasScore.length > 2)
            return SetErrorObject("emailcpf");
          return null; //If it's not, then the CPF is valid
        });
        break;

      default:
        break;
    }
  };

  //Function to check if values of two matching inputs really match
  const verifyMatching = (name) => {
    const getInput = inputData.filter((input) => input.name === name)[0];
    if (!getInput.matchingInput.enabled) return false; //If the matching "enabled" option is not true, then the input is not a matching input

    //Get the input name
    const matchInputName = getInput.matchingInput.match;

    //Get the matching input name
    const getMatchInput = inputData.filter(
      (input) => input.name === matchInputName
    )[0];

    let originalInput, verifyingInput;

    if (getMatchInput.matchingInput.original) {
      originalInput = getMatchInput;
      verifyingInput = getInput;
    } else {
      originalInput = getInput;
      verifyingInput = getMatchInput;
    }

    if (originalInput.value !== verifyingInput.value) {
      SetErrorObject("matching", verifyingInput.name); //If the values don't match, set an error
      return false;
    }
  };

  //Function to validate an input by checking it errors
  const validateErrors = (name) => {
    SetErrorObject("clear", name);
    verifyLength(name);
    verifyValue(name);
  };

  //Function that will be triggered when an input blurs
  const handleBlur = (e) => {
    const { name } = e.target;
    validateErrors(name); //When the input blurs, validate it.
  };

  //Function that will be triggered when the main button get clicked
  const handleButtonClick = () => {
    proxBtn.current.classList.add("clicked"); //Add the "clicked" class to the button
    setMainErrorValue(""); //Clear the main error state

    //Boolean variable that will define if all the inputs are valid and the program can execute
    let canContinue = true;

    //Check if all the "required" inputs are not empty
    const newInputData = inputData.map((input) => {
      if (!input.required) return null;
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

    //Verify matching in all matching inputs
    inputData.map((input) => {
      if (input.matchingInput.enabled && verifyMatching(input.name) === false) {
        return (canContinue = false);
      }

      if (input.error.enabled) {
        return (canContinue = false);
      }

      return null;
    });

    //If can continue is false, return and remove the "clicked" class from the main button
    if (!canContinue) return proxBtn.current.classList.remove("clicked");

    let name,
      lastname,
      emailcpf,
      password = ["", "", "", ""];

    inputData.map((input) => {
      const inputName = input.name;
      switch (inputName) {
        case "name":
          name = input.value;
          break;
        case "lastname":
          lastname = input.value;
          break;
        case "email":
          emailcpf = input.value;
          break;
        case "password":
          password = input.value;
          break;
        default:
          break;
      }
      return inputName;
    });

    const postNewUser = async () => {
      try {
        const { data } = await Axios.post(`${serverUrl}/account/register`, {
          name: name,
          lastname: lastname,
          emailcpf: emailcpf,
          password: password,
        });

        proxBtn.current.classList.remove("clicked");

        if (data.isError) {
          const errorCode = data.errorCode;
          switch (errorCode) {
            case "EMAIL_ALREADY_IN_USE":
              SetErrorObject(
                "custom",
                "email",
                "Esse e-mail ou CPF já está em uso!",
                false
              );
              break;
            case "INVALID_EMAIL":
              SetErrorObject(
                "custom",
                "email",
                "Esse e-mail ou CPF é inválido",
                false
              );
              break;
            default:
              setMainErrorValue(
                "Ocorreu um erro ao tentar te registrar. Por favor, tente recarregar a página"
              );
              break;
          }
          return;
        }

        if (data.queryStatus === 200) {
          let redirectUrl = `/confirm?id=${data.userInfo.userId}&token=${data.userInfo.registerToken}`;

          const nextPage = searchParams.get("next");
          if (nextPage && nextPage !== null)
            redirectUrl = `${redirectUrl}&next=${nextPage}`;

          navigate(redirectUrl);
        }
      } catch (err) {
        proxBtn.current.classList.remove("clicked");
        setMainErrorValue(
          `Ocorreu um erro interno do servidor. Tente novamente em alguns segundos. (${err})`
        );
      }
    };
    postNewUser();
  };

  return (
    <>
      {displayInputs()}
      <input
        id="nextBtn"
        style={{marginTop: "20px"}}
        ref={proxBtn}
        onClick={handleButtonClick}
        type="button"
        value="Próximo"
        className="proxbtt"
      />
      <Error
        style={{ textAlign: "center", marginTop: "5px" }}
        text={mainErrorValue}
      />
    </>
  );
};

export default RegisterInputs;
