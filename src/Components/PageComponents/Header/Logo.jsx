import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = ({ className, logo }) => {
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
    <div onClick={handleLogoClick} className={className}>
      <img
        style={{ cursor: "pointer" }}
        title="Voltar pra página principal"
        src={logo}
        alt="oncoffee-banner"
      />
    </div>
  );
};

export default Logo;
