import React from "react";
import { useNavigate } from "react-router-dom";

const NormalSearch = ({
  setInputValue,
  value,
  postInputSearchProductValue,
}) => {
  const navigate = useNavigate();

  //Normal autocomplete click
  const handleAutocompleteClick = () => {
    setInputValue((currentState) => {
      return {
        ...currentState,
        product: value,
      };
    });
    navigate(`/search?v=${value}`);
    document.querySelector("#content-search").classList.remove("active");
    document.querySelector(".swichline").style.marginLeft = "3%";
    window.scrollTo(0, 0);
    postInputSearchProductValue(value);
  };

  //When user click on "external link" icon, which will substitute the current inputValue to this search value
  const handleExternalLinkIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInputValue((currentState) => {
      return {
        ...currentState,
        product: value,
      };
    });
  };
  return (
    <li name="normal-search">
      <input id="normalsearch" type="button" style={{ display: "none" }} />
      <label onClick={handleAutocompleteClick}>
        <div className="recentsearchbox1">
          <i className="fas fa-search"></i>
        </div>
        <div className="recentsearchbox2">
          <p>{value}</p>
        </div>
        <div onClick={handleExternalLinkIconClick} className="recentsearchbox3">
          <i className="fas fa-external-link-alt"></i>
        </div>
      </label>
    </li>
  );
};

export default NormalSearch;
