import React from "react";

const Input = ({
  id,
  className,
  name,
  type,
  placeholder,
  minLength,
  maxLength,
  onClick,
  onBlur,
  onChange,
  value,
  form,
  isLastInput,
}) => {
  const handleKeyPress = (e) => {
    const { key } = e;
    if (key !== "Enter") return;

    if (!isLastInput) return;

    let targetBtn;

    switch (form) {
      case "login":
        targetBtn = document.querySelector("#loginBtn");
        break;
      case "register":
        targetBtn = document.querySelector("#nextBtn");
        break;
      default:
        break;
    }

    targetBtn.click();
  };
  return (
    <input
      autoComplete="off"
      id={id}
      className={className}
      name={name}
      type={type}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required
      onClick={onClick}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={handleKeyPress}
      value={value}
    />
  );
};

export default Input;
