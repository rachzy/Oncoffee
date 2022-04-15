import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";

const LogReg = () => {
  //function to get URL params
  const [searchParams] = useSearchParams();

  //"openRegister" param determines if the Register Box will be initially open
  //"nextPage" param determines the page that the user will be redirected to after the Login or Register
  const openRegister = searchParams.get("openRegister");

  const underline = useRef(null);

  const loginContainer = document.querySelector(".logincontainer");
  const loginBox = document.querySelector(".loginbox");
  const registerBox = document.querySelector(".registerbox");

  //Displays the "LoginBox"
  const handleLoginButtonClick = () => {
    if(!underline || underline.current === null) return;
    underline.current.style.marginLeft = "0%";
    loginContainer.classList.remove("grow");
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
  };

  //Displays the "RegisterBox"
  const handleRegisterButtonClick = () => {
    if(!underline || underline.current === null) return;
    underline.current.style.marginLeft = "50%";
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
    setTimeout(() => {
      loginContainer.classList.add("grow");
    }, 200);
  };

  //If "openRegister" is in the URL params, display the "RegisterBox"
  //(checking if underline.current is not undefined to check if the elements are already loaded)
  if (underline.current && openRegister !== null) {
   handleRegisterButtonClick();
  } else {
    handleLoginButtonClick();
  }
    

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
