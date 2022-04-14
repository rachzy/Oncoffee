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
  method,
  isLastInput
}) => {
  const handleKeyPress = (e) => {
    const { key } = e;
    if(key !== "Enter") return;

    if(!isLastInput) return;
    
    const nextBtn = document.querySelector("#nextBtn");
    nextBtn.click();
  }
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
      formMethod={method}
    />
  );
};

export default Input;
