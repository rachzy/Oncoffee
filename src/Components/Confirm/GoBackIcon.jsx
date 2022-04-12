import React from "react";

import { useNavigate } from "react-router-dom";

const GoBackIcon = () => {
  const navigate = useNavigate();
  return (
    <label onClick={() => navigate(-1)} htmlFor="backbtt">
      <i className="fas fa-angle-left" />
    </label>
  );
};

export default GoBackIcon;
