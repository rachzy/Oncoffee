import React from "react";

const LoginWith = () => {
  return (
    <div className="logininputcolumn2">
      <input type="button" id="facebookinput" className="loginbtts" />
      <input type="button" id="googleinput" className="loginbtts" />
      <label className="facebookinput" htmlFor="facebookinput">
        <p>
          <i className="fab fa-facebook"></i> Facebook
        </p>
      </label>
      <label className="googleinput" htmlFor="googleinput">
        <p>
          <i className="fab fa-google"></i>Google
        </p>
      </label>
    </div>
  );
};

export default LoginWith;
