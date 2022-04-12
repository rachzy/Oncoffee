import React from "react";

const MenuItem = ({ children, icon, alt, onClick }) => {
  return (
    <div onClick={onClick} className="shopkartmo3">
      <input type="button" id="kartbttmo" />
      <label htmlFor="kartbttmo" id="userbtt">
        <img src={icon} alt={alt} />
      </label>
      {children}
    </div>
  );
};

export default MenuItem;
