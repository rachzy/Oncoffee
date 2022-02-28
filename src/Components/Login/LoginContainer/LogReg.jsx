import React, { useRef } from "react";

const LogReg = () => {
  const underline = useRef(null);
  
  const loginContainer = document.querySelector(".logincontainer");
  const loginBox = document.querySelector(".loginbox");
  const registerBox = document.querySelector(".registerbox");

  const handleLoginButtonClick = () => {
    underline.current.style.marginLeft = "0%";
    loginContainer.classList.remove("grow");
    registerBox.classList.remove("active");
    loginBox.classList.add("active");
  }

  const handleRegisterButtonClick = () => {
    underline.current.style.marginLeft = "50%";
    loginContainer.classList.add("grow");
    loginBox.classList.remove("active");
    registerBox.classList.add("active");
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
