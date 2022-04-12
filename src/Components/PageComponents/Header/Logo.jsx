import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = ({ logo }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    const [swichline, contentSearch] = [
      document.querySelector(".swichline"),
      document.querySelector("#content-search"),
    ];

    if (swichline) swichline.style.marginLeft = "3%";
    contentSearch.classList.remove("active");

    navigate("/");
  };
  return (
    <div className="nav_mid">
      <a style={{cursor: "pointer"}} onClick={handleLogoClick}>
        <img src={logo} alt="" />
      </a>
    </div>
  );
};

export default Logo;
