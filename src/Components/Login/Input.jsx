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
  onKeyPress,
  value,
  method
}) => {
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
      onKeyPress={onKeyPress}
      value={value}
      formMethod={method}
    />
  );
};

export default Input;
