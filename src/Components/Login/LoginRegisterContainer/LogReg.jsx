import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";

const LogReg = () => {
  //function to get URL params
  const [searchParams, setSearchParams] = useSearchParams();

  //"openRegister" param determines if the Register Box will be initially open
  //"nextPage" param determines the page that the user will be redirected to after the Login or Register
  const [openRegister, nextPage] = [
    searchParams.get("openRegister"),
    searchParams.get("next"),
  ];

  const underline = useRef(null);

  const loginContainer = document.querySelector(".logincontainer");
  const loginBox = document.querySelector(".loginbox");
  const registerBox = document.querySelector(".registerbox");

  //Displays the "LoginBox"
  const handleLoginButtonClick = () => {
    underline.current.style.marginLeft = "0%";
    loginContainer.classList.remove("grow");
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
  };

  //Displays the "RegisterBox"
  const handleRegisterButtonClick = () => {
    underline.current.style.marginLeft = "50%";
    loginContainer.classList.add("grow");
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
  };

  //If "openRegister" is in the URL params, display the "RegisterBox"
  //(checking if underline.current is not undefined to check if the elements are already loaded)
  if (underline.current && openRegister !== null) handleRegisterButtonClick();

  return (
    <>
      <div className="log-reg">
        <label onClick={handleLoginButtonClick} className="login-button">
          <p>Login</p>
        </label>
        <label onClick={handleRegisterButtonClick} className="register-button">
          <p>Registrar</p>
        </label>
      </div>
      <div ref={underline} className="underline"></div>
    </>
  );
};

export default LogReg;
